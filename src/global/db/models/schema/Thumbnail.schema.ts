import { type InferModel, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const ThumbnailSchema = sqliteTable("thumbnail", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  courseId: integer("courseId").notNull(),
  size: text("size", { length: 50 }).notNull(),
  url: text("url").notNull(),
  expiresAt: text("expiresAt").notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
export type TThumbnailSchema = InferModel<typeof ThumbnailSchema>
