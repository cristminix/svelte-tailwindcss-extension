import Fs from "@/global/classes/Fs"
import { TmpSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MTmp extends DrizzleDB {
  schema = TmpSchema

  static instance: MTmp | null = null
  static getInstance() {
    if (!MTmp.instance) {
      const fs = new Fs("fs")
      // check db folder

      MTmp.instance = new MTmp(fs)
    }
    return MTmp.instance
  }
}

export default MTmp
