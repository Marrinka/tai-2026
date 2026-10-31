import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const tripPlans = sqliteTable('trip_plans', {
  id: text('id').primaryKey(),
  payload: text('payload').notNull(),
  revision: integer('revision').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
});
