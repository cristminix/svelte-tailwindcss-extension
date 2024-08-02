import { AuthorSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MAuthor extends DrizzleDB {
  schema = AuthorSchema
}

export default MAuthor
