<script lang="ts">
    import type DBStore from "@/global/db/DBStore"
    import type MCourse from "@/global/db/models/MCourse";
    import type MAuthor from "@/global/db/models/MAuthor";
    import type MSection from "@/global/db/models/MSection";
    import type MToc from "@/global/db/models/MToc";
    import type MExerciseFile from "@/global/db/models/MExerciseFile";
    import type MThumbnail from "@/global/db/models/MThumbnail";
    import type {AuthorInterface, CourseInfoInterface} from "@/global/classes/types";
    import {processCourseQueue} from "./icrd-queue-man/fn/processCourseQueue";

    export let routeApp: any
    
    export let store: DBStore
    export let config: any

    let mCourse:MCourse
    let mAuthor:MAuthor
    let mSection:MSection
    let mToc:MToc
    let mExFile:MExerciseFile
    let mThumbnail:MThumbnail
    // let menus: any = []


    export async function processQueue(courseInfo:CourseInfoInterface,authors:AuthorInterface[]){
        await  processCourseQueue(mCourse,courseInfo)
    }
    store.onReady(()=>{
        mCourse = store.get<MCourse>("Course") as MCourse
        mAuthor = store.get<MAuthor>("Author") as MAuthor
        mSection = store.get<MSection>("Section") as MSection
        mToc = store.get<MToc>("Toc") as MToc
        mExFile = store.get<MExerciseFile>("ExerciseFile") as MExerciseFile
        mThumbnail = store.get<MThumbnail>("Thumbnail") as MThumbnail
    })
</script>