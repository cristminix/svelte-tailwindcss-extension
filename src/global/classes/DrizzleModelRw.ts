import { eq } from "drizzle-orm"
import DrizzleBaseModelRw from "./DrizzleBaseModelRw"

class DrizzleModelRw extends DrizzleBaseModelRw {
  async update(pk: number | string, row: Partial<Omit<typeof this.schema, "id" | "timestamp">>,returning=false) {
    if (this.pk in row) delete row[this.pk]
    const cursor = ()=> this.db.update(this.schema).set(row).where(eq(this.schema[this.pk], pk))
    if (returning) {
      const results = await cursor().returning()
      const [row] = results
      return row
      // return await this.getRow({ slug: row.slug })
    }
    return await cursor()
  }
  async delete(pk: number | string,returning=false) {
    const cursor = ()=> this.db.delete(this.schema).where(eq(this.schema[this.pk], pk))
    if(returning) {
      const results = await cursor().returning()
      const [row] = results
      return row
    }
    return await cursor()
  }
  async create(row: Partial<Pick<typeof this.schema, "id" | "timestamp">> & Omit<typeof this.schema, "id" | "timestamp">,returning=false) {
    const cursor = ()=>this.db.insert(this.schema).values(row)
    if(returning){
      const results = await cursor().returning()
      const [row] = results
      return row
    }
    return cursor()
    // const success = await
    // if (success) {
    //   return await this.getRow({ slug: row.slug })
    // }
    // return success
  }
}

export default DrizzleModelRw
