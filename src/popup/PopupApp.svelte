<script lang="ts">
  import type { MessageEventInterface } from "@/global/classes/types"
  import type { MessageSender } from "@/global/fn/types"
  import "tailwindcss/tailwind.css"
  import "@fortawesome/fontawesome-free/css/all.min.css"
  import { writable, type Writable } from "svelte/store"
  import * as idb from "idb-keyval"
  import { getActiveTab } from "@/global/fn/getActiveTab"
  export const greeting = writable("LLFetcher 3.1")
  export const lastCourseList = writable({})
  export const fetchBtnState = writable(0)
  export const loading = writable(false)
  export const courseInfo = writable(null)
  export const validCoursePage = writable(false)
  export const disableFetchBtn = writable(false)
  export const isLogin = writable(false)
  export const legacyMode = writable(true)
  export const blockMainContent = writable(false)
  export const btnCls = writable("fa-plus")
  export const selectedCourseSlug = writable("")
  import icon from "/logo/icon-48.png"
  import { onMount } from "svelte"
  import { onMessage } from "@/global/fn/onMessage"
  import { sendMessage } from "@/global/fn/sendMessage"

  import type {LastCourseInterface} from "@/popup/type";

  import { openOptionsPage } from "@/global/fn/openOptionsPage"
  // import { isLinkedinLearningUrl } from "@/global/fn/course/isLinkedinLearningUrl"
  import { getCourseSlugFromUrl } from "@/global/fn/course/getCourseSlugFromUrl"
  import { insertCourseLegacyM3Rec } from "./fn/insertCourseLegacyM3Rec"
  import { SqlDB } from "@/global/classes/SqlDB"
  import DBStore from "@/global/db/DBStore"
  import type MSetting from "@/global/db/models/MSetting"
  import {loadLastCourseDdData} from "@/popup/fn/loadLastCourseDdData";
  import type {TCourse} from "@/global/db/models/schema";

  const sqldb = new SqlDB()
  const dbStore = DBStore.getInstance()
  const mSetting = dbStore.get("Setting") as MSetting

  const lastCourseDdData: Writable<LastCourseInterface[]> = writable([])

  async function onSelectCourse(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    const slug = event.currentTarget.value as string
    const [course] = $lastCourseDdData.filter((r)=>r.slug===slug)
    await idb.set("route.url",`/course/display/${course.id}/${slug}`)
    openOptionsPage()

    console.log("slug", slug)
    throw new Error("Function not implemented.")
  }
  async function onMessageAddCourseLegacy(data: any) {
    console.log(`PopupApp.onMessageAddCourseLegacy:`, { data })
    let courseSlug: string | null = null
    try {
      courseSlug = await mSetting.get("last-course-slug")
    } catch (e) {
      console.error(e)
    }
    console.log({ courseSlug })
    if (courseSlug) {
      await insertCourseLegacyM3Rec(courseSlug, data, (slug: string, success: boolean) => {
        if (success) {
          console.log(`insertCourseLegacyM3Rec success: ${slug}`)
          activateAddCourseOptionTab(courseSlug, true)
          //
        } else {
          console.log(`insertCourseLegacyM3Rec failed: ${slug}`)
          //
        }
      })
    }
  }
  async function broadcastGetM3Rec(courseSlug: string) {
    const msg = "cmd.getM3Rec"
    await sendMessage(msg, courseSlug)
  }
  async function addCourseLegacy(courseSlug: string) {
    console.log(`PopupApp.addCourseLegacy: ${courseSlug}`)
    try {
      await mSetting.set("last-course-slug", courseSlug)
    } catch (error) {
      console.error(error)
    }
    blockMainContent.update((o) => true)
    await broadcastGetM3Rec(courseSlug)
  }
  async function activateAddCourseOptionTab(courseSlug: string, legacyMode: boolean) {
    await idb.set("route.url", `/course/add/${courseSlug}${legacyMode ? "?legacyMode=true" : ""}`)
    console.log(`PopupApp.activateAddCourseOptionTab: ${courseSlug}`)
    openOptionsPage()
  }
  async function addCourseFromCurrentUrl(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    const currentTab: any = await getActiveTab()
    let errorMessage: string | null = null
    let errorOccured = true
    if (currentTab) {
      const url = currentTab.url
      if (url) {
        const [courseSlug, tocSlug] = getCourseSlugFromUrl(url)
        if (courseSlug && tocSlug) {
          errorOccured = false
          if ($legacyMode) {
            return await addCourseLegacy(courseSlug)
          } else {
            return await activateAddCourseOptionTab(courseSlug, false)
          }
        } else {
          errorMessage = `PopupApp.addCourseFromCurrentUrl: current tab url is not linkedin learning course url`
        }
      } else {
        errorMessage = `PopupApp.addCourseFromCurrentUrl: cant get current tab url`
      }
    }
    if (errorOccured) {
      console.error(errorMessage)
    }
  }
  function onMessageCommand(evt: MessageEventInterface, source: MessageSender) {
    console.log(evt)
    if (evt.name === "cmd.validCoursePage" || evt.name === "cmd.validCoursePageAuto") {
      validCoursePage.update((o) => evt.data)
      blockMainContent.update((o) => false)
    } else if (evt.name === "cmd.getM3Rec") {
      blockMainContent.update((o) => false)
      onMessageAddCourseLegacy(evt.data)
    }
  }
  async function broadcastGetValidCourseMessage() {
    blockMainContent.update((o) => true)
    const msg = "cmd.validCoursePage"
    await sendMessage(msg,null,"content",(f)=>{
      console.log(f)
    })
  }


  /* Implement logic when popup window opened */
  async function onPopupOpen(){
    console.log("PopupApp.onPopupOpen")
    const courseList=await loadLastCourseDdData(dbStore)
    if(courseList){
      const {records,totalRecords} = courseList
      if(totalRecords > 0){
        const courseRecords:LastCourseInterface[]=records as LastCourseInterface[]
        console.log( courseRecords )
        lastCourseDdData.set(courseRecords)
      }
    }
  }
  dbStore.onReady(() => {
    console.log(`mSetting  ${mSetting.isReady()}`)
    onPopupOpen()
  })
  onMount(() => {
    console.log(`PopupApp: onMount called`)
    broadcastGetValidCourseMessage()
    setTimeout(()=>{
      blockMainContent.update((o) => false)
    },5000)
    onMessage((evt, sender) => {
      console.log(`PopupApp receive messages`, { evt, sender })
      onMessageCommand(evt, sender)
    })
    sqldb.init().then(async () => {
      dbStore.setSqlDb(sqldb)
      // console.log(`mSetting initOrm ${mSetting.isReady()}`)
    })
    return () => {}
  })
</script>

<div class="relative min-h-[120px] p-4">
  {#if $blockMainContent}
    <div class="absolute top-0 start-0 w-full h-full bg-white/[.5] rounded-lg dark:bg-gray-800/[.4]"></div>
    <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {/if}

  <div class="welcome-page page gap-2 flex flex-col items-center pt-2">
    <div class="flex gap-2 items-center px-4">
      <div>
        <img
          src={icon}
          alt="icon"
          class="w-8 h-8"
        />
      </div>
      <div>
        <p class="font-bold pt-2 pb-4 text-center text-lg dark:text-white">
          {$greeting}
        </p>
      </div>
    </div>

    <div class="action-cnt w-[250px]">
      {#if $lastCourseDdData.length > 0}
        <select
          class="select w-full max-w-xs"
          on:change={onSelectCourse}
        >
          <option
            disabled
            selected={$selectedCourseSlug === ""}>Load last course</option
          >
          {#each $lastCourseDdData as course}
            <option value="{course.slug}">{course.title}</option>
          {/each}
        </select>
      {/if}

      {#if $validCoursePage}
        <div class="btn-cnt text-center flex gap-2 p-2 items-center">
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                bind:checked={$legacyMode}
                class="checkbox checkbox-primary checkbox-sm"
              />
              <span class="label-text dark:text-white text-xs ml-1">Legacy Mode</span>
            </label>
          </div>
          <button
            disabled={$fetchBtnState == 1 || !$validCoursePage || $disableFetchBtn}
            class="mx-auto btn btn-primary btn-xs"
            on:click={addCourseFromCurrentUrl}
            ><i class={`fas ${$btnCls}`} />Add This Course
          </button>
        </div>
      {:else}
        <div class="w-[250px] p-2 text-xs pb-2">Please make sure you are loged in with valid subscription and navigate in course page.</div>
      {/if}
    </div>
  </div>
</div>
