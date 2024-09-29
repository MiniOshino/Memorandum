// export const UsersTable = pgTable(
//   'users',
//   {
//     userName: text('user_name').notNull().primaryKey(),
//     password: text('password').notNull(),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//   }
// );
//
// export const usersRelations = relations(UsersTable, ({ many }) => ({
//   usersToGroups: many(UsersToFlagsTable),
// }));
//
// export const FlagsTable = pgTable(
//   'flags',
//   {
//     id: serial("id").primaryKey(),
//     name: text('flag_name').notNull().unique(),
//   }
// )
//
// export const FlagsRelations = relations(FlagsTable, ({ many }) => ({
//   usersToGroups: many(UsersToFlagsTable),
// }));
//
// export const UsersToFlagsTable = pgTable(
//   'users_to_flags',
//   {
//     userName: text("user_name").notNull().references(() => UsersTable.userName),
//     flagId: integer("flag_id").notNull().references(() => FlagsTable.id),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//   },
//   (t) => ({
//     pk: primaryKey({ columns: [t.userName, t.flagId] }),
//   }),
// )
//
// export const UsersToFlagsRelations = relations(UsersToFlagsTable, ({ one }) => ({
//   user: one(UsersTable, {
//     fields: [UsersToFlagsTable.userName],
//     references: [UsersTable.userName],
//   }),
//   FlagsTable: one(FlagsTable, {
//     fields: [UsersToFlagsTable.flagId],
//     references: [FlagsTable.id],
//   }),
// }));

import { text, integer, sqliteTable, SQLiteTimestamp, primaryKey, index } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    userName: text('user_name').primaryKey(),
    password: text('password').notNull(),
});

export const stats = sqliteTable('stats', {
    userName: text('user_name')
        .references(() => users.userName, { onDelete: 'cascade' })
        .notNull(),
    key: text('key').notNull(),
    value: text('value').notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userName, table.key] }),
    userNameIdx: index('user_name_idx').on(table.userName),
}));
