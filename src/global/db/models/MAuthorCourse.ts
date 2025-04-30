import {AuthorCourseSchema, type TAuthorCourse} from "./schema"
import DrizzleDB from "./DrizzleDB"

class MAuthorCourse extends DrizzleDB {
  schema = AuthorCourseSchema

    async exists(courseId: number, authorId: number/*,returnId = false*/) {
      // if (returnId){
      //   const result:TAuthorCourse|null = await this.getRow({ courseId, authorId })
      //   if (result) {
      //     return result.id
      //   }
      //   return 0
      // }
      return (await this.count({ courseId, authorId })) > 0
    }
}

export default MAuthorCourse
