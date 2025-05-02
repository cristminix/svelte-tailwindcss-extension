import type MAuthorCourse from "@/global/db/models/MAuthorCourse";
import type {TAuthorCourse, TAuthorCourseN} from "@/global/db/models/schema";

export async function insertAuthorCourse(mAuthorCourse:MAuthorCourse, row:TAuthorCourseN) {
<<<<<<< HEAD
  return await (mAuthorCourse.create(row,true)) as TAuthorCourse
=======
  return await mAuthorCourse.create(row,true);
>>>>>>> 9733476dec3c7cc7b4dd55ae942ff50eed3fc9e6
}