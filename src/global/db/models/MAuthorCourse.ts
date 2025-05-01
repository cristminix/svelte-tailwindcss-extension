import {AuthorCourseSchema, type TAuthorCourse} from "./schema"
import DrizzleDB from "./DrizzleDB"
import type {AuthorInterface} from "@/global/classes/types";

class MAuthorCourse extends DrizzleDB {
  schema = AuthorCourseSchema
  defaultOrder= {courseId:"asc"}

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
