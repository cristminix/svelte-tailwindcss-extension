import DrizzleModelRw from "@/global/classes/DrizzleModelRw"

class DrizzleDB extends DrizzleModelRw {
  path = "llfetcher.db"
  dir = "/db"
  isReady() {
    return this.sqldb?.isReady()
  }
}

export default DrizzleDB
