import { eq } from "drizzle-orm"
import DrizzleBaseModelRw from "./DrizzleBaseModelRw"
import initSqlJs from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { extGetUrl } from "../fn/extGetUrl"
import * as schema from "@/global/db/models/schema"
const getWasmUrl = (file: string) => {
  return extGetUrl(`db/${file}`)
}
const getDBUrl = (file: string) => {
  return extGetUrl(`db/${file}`)
}
class DrizzleModelRw extends DrizzleBaseModelRw {
  async initOrm() {
    if (this.ready) return

    const dbpath = this.getDbPath()
    const sqlWasmGitPath = this.getWasmPath()
    console.log(`orm:try to read ${dbpath}`)
    let ready = false
    try {
      if (this.fs) {
        // check db dir
        const dbDir = `${this.dir}`
        if (!(await this.fs.existsSync(dbDir))) {
          console.log(`mkdir:${dbDir}`)
          await this.fs.mkdirSync(dbDir)
        }

        console.log(`checking ${dbpath} if exist`)

        if (!(await this.fs.existsSync(dbpath))) {
          // await this.fs.mkdirSync(this.dir)
          const dbUrl = getDBUrl(this.path!)
          console.log(`download database file: ${dbUrl}`)
          const filebuffer = await fetch(dbUrl).then((response) => response.arrayBuffer())
          // console.log(dbfile.toString())
          console.log(`writing file: ${dbpath}`)

          await this.fs.writeFileSync(dbpath, new Uint8Array(filebuffer))
        } else {
          console.log(`${dbpath} exist`)
        }
        const filebuffer = await this.fs.readFileSync(dbpath)

        const sqlPromise = await initSqlJs({
          locateFile: (file) => getWasmUrl(file),
        })

        this.sqldb = new sqlPromise.Database(filebuffer as Buffer)
        const db = drizzle(this.sqldb, { schema })
        console.log(db)

        this.db = db
        ready = true
      }
    } catch (e) {
      console.error(e)
    }
    this.ready = ready
  }
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
