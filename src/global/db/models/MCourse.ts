import Fs from "@/global/classes/Fs"
import { CourseSchema } from "./schema"
// import DrizzleModelRw from "@/global/classes/DrizzleModelRw"
import DrizzleDB from "./DrizzleDB"

class MCourse extends DrizzleDB {
  schema = CourseSchema

  static instance: MCourse | null = null
  static getInstance() {
    if (!MCourse.instance) {
      const fs = new Fs("fs")
      // check db folder

      MCourse.instance = new MCourse(fs)
    }
    return MCourse.instance
  }
}

export default MCourse
