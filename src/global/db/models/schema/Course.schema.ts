import { type InferModel, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const CourseSchema = sqliteTable("course", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  duration: integer("duration").notNull(),
  sourceCodeRepository: text("sourceCodeRepository").notNull(),
  description: text("description").notNull(),
  urn: text("urn").notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
export type TCourse = InferModel<typeof CourseSchema>