import DrizzleDB from "./DrizzleDB"
import { AppSchema } from "./schema"

class MCourse extends DrizzleDB {
  schema = AppSchema
}

export default MCourse
