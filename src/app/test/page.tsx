import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users } from '@/drizzle/schema';
import { Login, Signup, StatDisplay, StatForm, TestVerify } from './Login';

export default async function Test() {
    const sqlite = new Database('./test.db');
    const db = drizzle(sqlite);
    const result = await db.select().from(users);
    console.log('db works', result);

    return <div>
        {result.map(i => <p key={i.userName}>{i.userName}</p>)}
        <p>hi</p>
        <Signup />
        <TestVerify />
        <Login />
        <StatForm />
        <StatDisplay />
    </div>;
}

