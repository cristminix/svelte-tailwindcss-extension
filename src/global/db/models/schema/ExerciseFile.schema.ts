import { type InferModel, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const ExerciseFileSchema = sqliteTable("exerciseFile", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  courseId: integer("courseId").notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
export type TExerciseFileSchema = InferModel<typeof ExerciseFileSchema>
