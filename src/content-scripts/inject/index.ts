import Logger from "@/global/classes/Logger"
import { initApp, cleanup } from "./content-script-app"
const runnerName = "Active Page Script Runner"

export const ActivePageScriptRunner = {
  cleanup() {
    Logger.debug(`Cleanup existing runner`)
    cleanup()
    return this
  },
  run() {
    Logger.debug(`Starting ${runnerName} Gui v1.0.0`)
    this.init()
  },
  init() {
    initApp()
  },
}
