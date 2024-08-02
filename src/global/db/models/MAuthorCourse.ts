import { AuthorCourseSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MAuthorCourse extends DrizzleDB {
  schema = AuthorCourseSchema
}

export default MAuthorCourse
