import { eq } from "drizzle-orm"
import DrizzleBaseModelRw from "./DrizzleBaseModelRw"

class DrizzleModelRw extends DrizzleBaseModelRw {
  async update(pk: number | string, row: any) {
    delete row[this.pk]
    return await this.db.update(this.schema).set(row).where(eq(this.schema[this.pk], pk))
  }
  async delete(pk: number | string, row: any) {
    return await this.db.delete(this.schema).where(eq(this.schema[this.pk], pk))
  }
  async create(row: any) {
    return await await this.db.insert(this.schema).values(row)
  }
}

export default DrizzleModelRw
