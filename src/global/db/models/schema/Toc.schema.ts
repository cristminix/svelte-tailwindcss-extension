import { type InferModel, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const TocSchema = sqliteTable("toc", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  sectionId: integer("sectionId").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
export type TTocSchema = InferModel<typeof TocSchema>
