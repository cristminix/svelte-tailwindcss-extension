import DrizzleModelRw from "@/global/classes/DrizzleModelRw"
import Fs from "@/global/classes/Fs"
import { AppSchema } from "./schema"
class DrizzleDB extends DrizzleModelRw {
  path = "llfetcher.db"
  dir = "/db"
  schema = AppSchema
  static instance: DrizzleDB | null = null
  static getInstance() {
    if (!DrizzleDB.instance) {
      const fs = new Fs("fs")
      // check db folder

      DrizzleDB.instance = new DrizzleDB(fs)
    }
    return DrizzleDB.instance
  }
}

export default DrizzleDB
