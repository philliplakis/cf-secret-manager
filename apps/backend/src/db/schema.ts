import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const secrets = sqliteTable('secrets', {
  id: text().primaryKey(),
  name: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});
