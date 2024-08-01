import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const UsersTable = pgTable(
  'users',
  {
    userName: text('user_name').notNull().primaryKey(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  }
);

export const usersRelations = relations(UsersTable, ({ many }) => ({
  usersToGroups: many(UsersToFlagsTable),
}));

export const FlagsTable = pgTable(
  'flags',
  {
    id: serial("id").primaryKey(),
    name: text('flag_name').notNull().unique(),
  }
)

export const FlagsRelations = relations(FlagsTable, ({ many }) => ({
  usersToGroups: many(UsersToFlagsTable),
}));

export const UsersToFlagsTable = pgTable(
  'users_to_flags',
  {
    userName: text("user_name").notNull().references(() => UsersTable.userName),
    flagId: integer("flag_id").notNull().references(() => FlagsTable.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userName, t.flagId] }),
  }),
)

export const UsersToFlagsRelations = relations(UsersToFlagsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [UsersToFlagsTable.userName],
    references: [UsersTable.userName],
  }),
  FlagsTable: one(FlagsTable, {
    fields: [UsersToFlagsTable.flagId],
    references: [FlagsTable.id],
  }),
}));
