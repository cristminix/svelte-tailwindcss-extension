import type DBStore from "@/global/db/DBStore";
import  MCourse from "@/global/db/models/MCourse";
import type {DBListInterface} from "@/global/db/types";

export async function loadLastCourseDdData(dbStore:DBStore){
    const mCourse =  dbStore.get<MCourse>("Course");
    let courseList:DBListInterface|null=null
    if (mCourse) {
        courseList = await mCourse.getList(100)
    }
    return courseList

}