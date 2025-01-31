import { text, pgTable, primaryKey, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userName: text("user_name").primaryKey(),
  password: text("password").notNull(),
});

export const stats = pgTable(
  "stats",
  {
    userName: text("user_name")
      .references(() => users.userName, { onDelete: "cascade" })
      .notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
  },
  (table) => [
    index("user_name_idx").on(table.userName, table.key),
    primaryKey({ columns: [table.userName, table.key] }),
  ]
);
