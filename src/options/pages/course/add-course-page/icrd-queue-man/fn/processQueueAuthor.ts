import type MAuthor from "@/global/db/models/MAuthor";
import type {AuthorInterface} from "@/global/classes/types";
import {
    checkAuthorExists,
    insertAuthor,
    updateAuthor
} from "@/options/pages/course/add-course-page/icrd-queue-man/tasks/author";
import type {TAuthorN, TAuthorU} from "@/global/db/models/schema";
import {
    checkAuthorCourseExists
} from "@/options/pages/course/add-course-page/icrd-queue-man/tasks/author-course/checkAuthorCourseExists";
import type MAuthorCourse from "@/global/db/models/MAuthorCourse";
import {
    insertAuthorCourse
} from "@/options/pages/course/add-course-page/icrd-queue-man/tasks/author-course/insertAuthorCourse";

export async function processQueueAuthor(mAuthorCourse:MAuthorCourse,mAuthor:MAuthor,courseId:number,authors:AuthorInterface[]){
    for(const author of authors){
        const {name,slug,biography} = author
        const authorId = await checkAuthorExists(mAuthor,slug)
        if(authorId) {
            const row:TAuthorU = {name, slug, bio:biography}
            await updateAuthor(mAuthor,authorId, row)
        }else {
            const row:TAuthorN = {name, slug, bio:biography}
            await insertAuthor(mAuthor, row)
        }

        const authorCourseExists = await checkAuthorCourseExists(mAuthorCourse,courseId,authorId)
        if(!authorCourseExists){
            await insertAuthorCourse(mAuthorCourse,{courseId,authorId})
        }
    }
}