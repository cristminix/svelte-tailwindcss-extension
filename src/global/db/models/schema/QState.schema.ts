import { type InferModel, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const QStateSchema = sqliteTable("qstate", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  courseId: integer("courseId").notNull(),
  tocId: integer("tocId").notNull(),
  idx: integer("idx").notNull(),
  state: text("state").notNull(),
  result: text("result").notNull(),
  mState: text("mState").notNull(),
  mSesult: text("mResult").notNull(),
  mLoaded: integer("mLoaded").notNull(),
  mSize: integer("mSize").notNull(),
  tState: text("tState").notNull(),
  tSesult: text("tResult").notNull(),
  tLoaded: integer("tLoaded").notNull(),
  tSize: integer("tSize").notNull(),
  dtStart: text("dtState").notNull(),
  dtEnd: text("dtEnd").notNull(),

  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type TQStateSchema = InferModel<typeof QStateSchema>
