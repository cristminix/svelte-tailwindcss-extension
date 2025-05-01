<script lang="ts">
    import type DBStore from "@/global/db/DBStore"
    import type MCourse from "@/global/db/models/MCourse";
    import type MAuthor from "@/global/db/models/MAuthor";
    import type MSection from "@/global/db/models/MSection";
    import type MToc from "@/global/db/models/MToc";
    import type MExerciseFile from "@/global/db/models/MExerciseFile";
    import type MThumbnail from "@/global/db/models/MThumbnail";
    import type {AuthorInterface, CourseAuthorInterface, CourseInfoInterface} from "@/global/classes/types";
    import {processCourseQueue} from "./icrd-queue-man/fn/processCourseQueue";
    import type MAuthorCourse from "@/global/db/models/MAuthorCourse";
    import {processQueueAuthor} from "@/options/pages/course/add-course-page/icrd-queue-man/fn/processQueueAuthor";
    import Button from "@/global/components/ux/Button.svelte";
    import {onMount} from "svelte";

    export let routeApp: any = null
    
    export let store: DBStore
    export let config: any = null

    let mCourse:MCourse
    let mAuthor:MAuthor
    let mAuthorCourse:MAuthorCourse
    let mSection:MSection
    let mToc:MToc
    let mExFile:MExerciseFile
    let mThumbnail:MThumbnail
    // let menus: any = []


    export async function processQueue(courseInfo:CourseInfoInterface,authors:CourseAuthorInterface[]){
        let resultTmp:any = await processCourseQueue(mCourse,courseInfo)
        console.log({processCourseQueue:resultTmp})
        const {id:courseId} = resultTmp
        resultTmp = await processQueueAuthor(mAuthorCourse,mAuthor,courseId,authors)
        console.log({processQueueAuthor:resultTmp})
    }
    onMount(() => {
        if (store.isReady()) {
            mCourse = store.get<MCourse>("Course") as MCourse
            mAuthor = store.get<MAuthor>("Author") as MAuthor
            mAuthorCourse = store.get<MAuthorCourse>("AuthorCourse") as MAuthorCourse
            mSection = store.get<MSection>("Section") as MSection
            mToc = store.get<MToc>("Toc") as MToc
            mExFile = store.get<MExerciseFile>("ExerciseFile") as MExerciseFile
            mThumbnail = store.get<MThumbnail>("Thumbnail") as MThumbnail
        }
    })

</script>
<div>
<!--    <Button caption="Process ICRD Queue" on:click/>-->
</div>