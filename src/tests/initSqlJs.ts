import nodeFs from "node:fs"
import path from "node:path"
import "fake-indexeddb/auto"
import Fs from "@/global/classes/Fs"
export async function initSqlJs() {
  let logMessage = "initSqlJs() : init database file for test environment"
  let success = false
  let error: any = null
  const localFileDbpath = path.join("./dist/db/llfetcher.db")
  const exists = await nodeFs.existsSync(localFileDbpath)
  const fs = new Fs("fs")
  if (exists) {
    try {
      const filebuffer = await nodeFs.readFileSync(localFileDbpath)
      await fs.mkdirSync("/db")
      await fs.writeFileSync("/db/llfetcher.db", filebuffer)
      success = true
    } catch (err) {
      error = err
    }
  }
  console.log(`${logMessage}\n\t--> ${success ? "success" : "failed"} loading database file ${localFileDbpath}`, { error })
}
