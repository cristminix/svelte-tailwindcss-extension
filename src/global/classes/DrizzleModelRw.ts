import { eq } from "drizzle-orm"
import DrizzleBaseModelRw from "./DrizzleBaseModelRw"

class DrizzleModelRw extends DrizzleBaseModelRw {
  async update(pk: number | string, row: Partial<Omit<typeof this.schema, "id" | "timestamp">>) {
    if (this.pk in row) delete row[this.pk]
    const success = await this.db.update(this.schema).set(row).where(eq(this.schema[this.pk], pk))
    if (success) {
      return await this.getRow({ slug: row.slug })
    }
    return null
  }
  async delete(pk: number | string) {
    return await this.db.delete(this.schema).where(eq(this.schema[this.pk], pk))
  }
  async create(row: Partial<Pick<typeof this.schema, "id" | "timestamp">> & Omit<typeof this.schema, "id" | "timestamp">) {
    const success = await this.db.insert(this.schema).values(row)
    if (success) {
      return await this.getRow({ slug: row.slug })
    }
    return null
  }
}

export default DrizzleModelRw
