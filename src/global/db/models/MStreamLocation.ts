import Fs from "@/global/classes/Fs"
import { StreamLocationSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MStreamLocation extends DrizzleDB {
  schema = StreamLocationSchema

  static instance: MStreamLocation | null = null
  static getInstance() {
    if (!MStreamLocation.instance) {
      const fs = new Fs("fs")
      // check db folder

      MStreamLocation.instance = new MStreamLocation(fs)
    }
    return MStreamLocation.instance
  }
  async deleteByTocId(tocId: number) {
    // await this.deleteRows({tocId})
  }
  getByTocId(tocId: number, fmt: number) {
    // return this.singleQuery({ query: { tocId, fmt } })
  }
  getListByTocId(tocId: number) {
    // return this.query({ query: { tocId } })
  }
  async createLegacy(fmt: string, url: string, tocId: number, expiresAt: number | null = null) {
    /*
    let streamloc = this.getByTocId(tocId, fmt)
    if (streamloc) {
      streamloc.url = url
      this.db.update(this.table, (row) => {
        row.url = url
        return row
      })
    } else {
      const id = 0
      streamloc = { id, tocId, fmt, url, expiresAt }
      streamloc.id = this.db.insert(this.table, streamloc)
    }
    await this.db.commit()

    return streamloc
    */
  }
}

export default MStreamLocation
