<script lang="ts">
  import type DBStore from "@/global/db/DBStore"
  import type {
    TExerciseFile,
    TThumbnail,
    TAuthor,
    TCourse,
  } from "@/global/db/models/schema"
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import {
    getCourseDetail,
    type TGetCourseDetailResult,
  } from "./course-display-page/fn/getCourseDetail"
  import type MCourse from "@/global/db/models/MCourse"
  import type MExerciseFile from "@/global/db/models/MExerciseFile"
  import type MThumbnail from "@/global/db/models/MThumbnail"
  import { JsonView } from "@zerodevx/svelte-json-view"
  import { data } from "jquery"
  import type MAuthor from "@/global/db/models/MAuthor"
  import type MAuthorCourse from "@/global/db/models/MAuthorCourse"
  import Fs from "@/global/classes/Fs"
  import FsImage from "./course-display-page/fn/FsImage.svelte"

  export let params: any
  export let queryString: any
  export let routeApp: any
  export let store: DBStore
  export let sourceParam: any
  // const courseDetail = writable<TGetCourseDetailResult | null>(null)
  const fs = new Fs("fs")
  let course = writable<TCourse | null>(null)
  let authors = writable<TAuthor[]>([])
  let exerciseFiles = writable<TExerciseFile[]>([])
  let thumbnails = writable<TThumbnail[]>([])
  let mCourse: MCourse
  let mExerciseFile: MExerciseFile
  let mThumbnnail: MThumbnail
  let mAuthor: MAuthor
  let mAuthorCourse: MAuthorCourse

  const loadModels = () => {
    mCourse = store.get("Course") as MCourse
    mExerciseFile = store.get("ExerciseFile") as MExerciseFile
    mThumbnnail = store.get("Thumbnail") as MThumbnail
    mAuthor = store.get("Author") as MAuthor
    mAuthorCourse = store.get("AuthorCourse") as MAuthorCourse
  }
  const loadData = async (courseId: number) => {
    loadModels()
    console.log("loadData", courseId)
    const courseDetailsRec = await getCourseDetail(
      mCourse,
      mExerciseFile,
      mThumbnnail,
      mAuthor,
      mAuthorCourse,
      courseId
    )
    console.log({ courseDetailsRec })
    const {
      course: course_,
      authors: authors_,
      exerciseFiles: exerciseFiles_,
      thumbnails: thumbnails_,
    } = courseDetailsRec
    thumbnails.update((o) => [])

    setTimeout(() => {
      course.update((o) => course_)
      authors.update((o) => authors_)
      exerciseFiles.update((o) => exerciseFiles_)
      thumbnails.update((o) => thumbnails_)
    }, 512)
  }
  onMount(() => {
    store.onReady(() => {
      console.log("DBStore is ready", params)
      loadData(params.id)
    })
    // if (sourceParam) {
    //   sourceParam.subscribe((o) => {
    //     console.log("sourceParam", o)
    //     if (o && o.id) {
    //       loadData(o.id)
    //     }
    //   })
    // }
    if (routeApp) {
      // routeApp.addRouteChangeCallback(() => {
      //   const [a, self] = arguments
      //   console.log("route change", { self })
      //   loadData(self.params.id)
      // }, "course-display-page")
    }
  })
  $: {
    loadData(params.id)
  }
</script>

<!-- <code>
  [{JSON.stringify(params)}]
</code> -->
<div class="course-detail-page">
  <JsonView json={$course} />
  {#if course}
    <h3 class="text-xl mb-2">{$course?.title}</h3>
    <p>{$course?.description}</p>
  {/if}
  <JsonView json={$authors} />
  <!-- <JsonView json={$thumbnails} /> -->
  <h4>Thumbnail</h4>
  {#each $thumbnails as thumbnail}
    {#if thumbnail.path}
      <div class="thumbnail-item">
        <FsImage
          {fs}
          path={thumbnail.path}
          alt={thumbnail.path}
          title={thumbnail.size}
        />
      </div>
    {/if}
  {/each}
  <JsonView json={$exerciseFiles} />
</div>
