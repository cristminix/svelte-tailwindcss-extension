import Fs from "@/global/classes/Fs"
import { SettingSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"
import { eq } from "drizzle-orm"

class MSetting extends DrizzleDB {
  // pk = "key"
  schema = SettingSchema

  static instance: MSetting | null = null
  static getInstance() {
    if (!MSetting.instance) {
      const fs = new Fs("fs")
      // check db folder

      MSetting.instance = new MSetting(fs)
    }
    return MSetting.instance
  }

  async get(key: string) {
    const record = await this.getRow({ key })
    if (record) {
      console.log(`MSetting.get('${key}')`, { record })

      return record.value
    }
    return null
  }
  async set(key: string, value: any, kind: string = "string") {
    const record = await this.getRow({ key })
    if (record) {
      console.log(`MSetting.set update record`)
      return await this.db.update(this.schema).set({ value }).where(eq(this.schema["key"], key))
    } else {
      console.log(`MSetting.set create new record`, { key, value, kind })

      await this.create({ key, value, kind })
    }
  }
}

export default MSetting
