import type {CourseInfoInterface} from "@/global/classes/types";
import {
    checkCourseExists,
    insertCourse,
    updateCourse
} from "@/options/pages/course/add-course-page/icrd-queue-man/tasks/course";
import type {TCourseN, TCourseU} from "@/global/db/models/schema";
import type MCourse from "@/global/db/models/MCourse";

export async function processCourseQueue(mCourse:MCourse,courseInfo:CourseInfoInterface){
     const {slug, title, description, duration,sourceCodeRepository,urn} = courseInfo
     const courseId = await checkCourseExists(mCourse, slug)

     if(courseId){
         const row:TCourseU = {slug, title, description, duration,sourceCodeRepository,urn}
         await updateCourse(mCourse,courseId, row)
     }else{
         const row : TCourseN = {slug, title, description, duration,sourceCodeRepository,urn}
         await insertCourse(mCourse,row)
     }
 }