import { db, getUsers } from '@/drizzle/db';
import { UsersTable } from '@/drizzle/schema';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  const { petName, ownerName } = await request.json();
 
  const stuff = await db.insert(UsersTable).values({name: petName, email: ownerName, image: "fufufu"}).returning();
 
  return NextResponse.json(stuff, { status: 200 });
  //return new Response(null, {status: 204});
}

export async function GET() {
    const stuff = await getUsers();
    return NextResponse.json(stuff, { status: 200 });
  }