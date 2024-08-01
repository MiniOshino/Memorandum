import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
 
export const UsersTable = pgTable(
  'users',
  {
    userName: text('userName').notNull().unique().primaryKey(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  }
);