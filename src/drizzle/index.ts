// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import * as schema from './schema';

// // const client = createClient({
// //   url: process.env.TURSO_CONNECTION_URL!,
// //   authToken: process.env.TURSO_AUTH_TOKEN!,
// // });

// const sqlite = new Database('./test.db');

// export const db = drizzle(sqlite, { schema: { ...schema } });

// src/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });