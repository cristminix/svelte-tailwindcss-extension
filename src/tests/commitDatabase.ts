import nodeFs from "node:fs"
import path from "node:path"
import "fake-indexeddb/auto"
import Fs from "@/global/classes/Fs"
import { writeJsonFile } from "./writeJsonFile"
import { loadJsonFile } from "./loadJsonFile"
import type { JSONValue } from "@/global/classes/types"
export async function commitDatabase(outputFilename: string) {
  let logMessage = "commitDatabase() : store database file for test environment"
  let success = false
  let error: any = null
  const config = await loadJsonFile<object>("config.json")
  const dbpath = `./public/db/${outputFilename}`
  const localFileDbpath = path.join(dbpath)
  const fs = new Fs("fs")
  const exists = await fs.existsSync("/db/llfetcher.db")

  if (exists) {
    try {
      const filebuffer = await fs.readFileSync("/db/llfetcher.db")
      await nodeFs.writeFileSync(localFileDbpath, filebuffer)
      await writeJsonFile("config.json", JSON.stringify({ ...config, dbpath }, null, 2))
      success = true
    } catch (err) {
      error = err
    }
  }
  console.log(`${logMessage}\n\t--> ${success ? "success" : "failed"} saving database file ${localFileDbpath}`, { error })
}
