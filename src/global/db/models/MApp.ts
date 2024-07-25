import DrizzleModelRw from "@/global/classes/DrizzleModelRw"
import Fs from "@/global/classes/Fs"
import * as schema from "./schema"
class MApp extends DrizzleModelRw {
  static instance: MApp | null = null
  static getInstance() {
    if (!MApp.instance) {
      const fs = new Fs("fs")
      MApp.instance = new MApp(fs, schema)
    }
    return MApp.instance
  }
}
