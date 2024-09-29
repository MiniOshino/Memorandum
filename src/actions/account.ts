'use server';
import "server-only";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { stats, users } from "@/drizzle/schema";
import { use } from "react";


export async function signup(userName: string, password: string) {
    if (!password) return {
        errors: { userName: '', password: "No Pw" }
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = await new SignJWT({ userName })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(secret);

    cookies().set({
        name: 'user-token',
        value: jwt,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: 60 * 60 * 2,
        sameSite: 'strict',
    })

    const user = await db.query.users.findFirst({ where: eq(users.userName, userName) });
    if (user) return { errors: { userName: "This username is already used." } }

    const pwHash = await hash(password, 10);
    await db.insert(users).values({ userName, password: pwHash });

    return { errors: { userName: '', password: '' } };
}

export async function login(userName: string, password: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const user = await db.query.users.findFirst({ where: eq(users.userName, userName) });
    if (!user) return { errors: { userName: "This username does not exist." } }

    if (!await compare(password, user.password)) return { errors: { userName: '', password: 'Wrong password' } };

    const jwt = await new SignJWT({ userName })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(secret);

    cookies().set({
        name: 'user-token',
        value: jwt,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: 60 * 60 * 2,
        sameSite: 'strict',
    })

    return { errors: { userName: '', password: '' } };
}

export async function validateToken() {
    const token = cookies().get('user-token');
    if (!token) return false;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        const { payload } = await jwtVerify(token.value, secret);
        return payload;
    } catch (error) {
        return false;
    }

}

export async function pullState() {
    const token = await validateToken();
    if (!token) return { error: "pls login" }

    const user_stats = await db.query.stats.findMany({
        where: eq(stats.userName, token.userName as string)
    });

    console.log(user_stats);

    return user_stats.map(({ userName, ...rest }) => rest);
}

export async function pushState(stat: string, value: string) {
    const token = await validateToken();
    if (!token) return { error: "pls login" }

    try {
        await db.insert(stats).values({
            key: stat, value, userName: token.userName as string
        }).onConflictDoUpdate({
            target: [stats.userName, stats.key],
            set: { value }
        });
    } catch (e) {
        console.error(e);
        return { error: 'db error' };
    }
    return 'saved';
}
