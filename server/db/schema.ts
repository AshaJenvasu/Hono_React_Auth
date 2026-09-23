import { sql } from "drizzle-orm";

export const todos = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 500 }).notNull(),
  description: varchar({ length: 1000 }),
  completed: boolean().default(false),
  createdAt: timestamp({ withTimeZone: true }).defaultNow(),
  updatedAt: timestamp({ withTimeZone: true }).defaultNow(),
});
