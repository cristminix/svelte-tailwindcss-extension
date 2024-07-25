<script lang="ts">
  import type { MessageEventInterface } from "@/global/classes/types"
  import type { MessageSender } from "@/global/fn/types"
  import "tailwindcss/tailwind.css"
  import "@fortawesome/fontawesome-free/css/all.min.css"
  import { writable, type Writable } from "svelte/store"
  import * as idb from "idb-keyval"

  export const greeting = writable("LLFetcher 3.1")
  export const lastCourseList = writable({})
  export const fetchBtnState = writable(0)
  export const loading = writable(false)
  export const courseInfo = writable(null)
  export const validCoursePage = writable(false)
  export const disableFetchBtn = writable(false)
  export const isLogin = writable(false)
  export const legacyMode = writable(false)
  export const blockMainContent = writable(false)
  export const btnCls = writable("fa-plus")
  export const selectedCourseSlug = writable("")
  import icon from "/logo/icon-48.png"
  import { onMount } from "svelte"
  import { onMessage } from "@/global/fn/onMessage"
  import { sendMessage } from "@/global/fn/sendMessage"

  interface LastCourseInterface {
    name: string
    slug: string
  }

  import DrizzleDB from "@/global/db/models/DrizzleDB"
  const DB = DrizzleDB.getInstance()

  const lastCourseDdData: Writable<LastCourseInterface[]> = writable([])

  function onSelectCourse(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
    throw new Error("Function not implemented.")
  }

  function addCourseFromCurrentUrl(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    throw new Error("Function not implemented.")
  }
  function onMessageCommand(evt: MessageEventInterface, source: MessageSender) {
    console.log(evt)
    if (evt.name === "cmd.validCoursePage" || evt.name === "cmd.validCoursePageAuto") {
      validCoursePage.update((o) => evt.data)
      blockMainContent.update((o) => false)
    }
  }
  async function broadcastGetValidCourseMessage() {
    blockMainContent.update((o) => true)
    const msg = "cmd.validCoursePage"
    sendMessage(msg)
  }
  onMount(() => {
    console.log(`PopupApp: onMount called`)
    broadcastGetValidCourseMessage()
    onMessage((evt, sender) => {
      console.log(`PopupApp receive messages`, { evt, sender })
      onMessageCommand(evt, sender)
    })
    DB.initOrm().then(async () => {
      console.log(`DB initOrm ${DB.ready}`)
      if (DB.ready) {
        // this.db.select().from(this.schema).all()
        const result = await DB.getAll()
        console.log(result)
      }
    })
    return () => {}
  })
</script>

<div class="relative">
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
        <img src={icon} alt="icon" class="w-8 h-8" />
      </div>
      <div>
        <p class="font-bold pt-2 pb-4 text-center text-lg dark:text-white">
          {$greeting}
        </p>
      </div>
    </div>

    <div class="action-cnt w-full">
      {#if $lastCourseDdData.length > 0}
        <select class="select w-full max-w-xs" on:select={onSelectCourse}>
          <option disabled selected={$selectedCourseSlug === ""}>Load last course</option>
          {#each $lastCourseDdData as course}
            <option>{course.name}</option>
          {/each}
        </select>
      {/if}

      {#if $validCoursePage}
        <div class="btn-cnt text-center flex gap-2 p-2 items-center">
          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" bind:checked={$legacyMode} class="checkbox checkbox-primary checkbox-sm" />
              <span class="label-text dark:text-white text-xs ml-1">Legacy Mode</span>
            </label>
          </div>
          <button disabled={$fetchBtnState == 1 || !$validCoursePage || $disableFetchBtn} class="mx-auto btn btn-primary btn-xs" on:click={addCourseFromCurrentUrl}
            ><i class={`fas ${$btnCls}`} />Add This Course
          </button>
        </div>
      {:else}
        <div class="w-[250px] px-2 text-xs pb-2">Please make sure you are loged in with valid subscription and navigate in course page.</div>
      {/if}
    </div>
  </div>
</div>
