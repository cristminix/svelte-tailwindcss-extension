<script lang="ts">
  import browser from "webextension-polyfill"

  import { recursiveJSONStringify } from "@/global/fn/recursiveJSONStringify"
  import { hasMethod } from "@/global/fn/hasMethod"
  export let containerId: string

  import { writable } from "svelte/store"
  import { getCourseSlugByPath } from "../fn"
  import { topWindow } from "./TopWindow"
  import type { InputScriptInterface } from "@/content-scripts/types"
  import { createRandCls } from "@/global/fn/createRandCls"
  import CoursePageChecker from "./CoursePageChecker.svelte"
  export const validCoursePage = writable(false)
  export const urlPath = writable("")

  export function setValidCoursePage(value: boolean) {
    validCoursePage.update((o) => value)
  }
  export function setUrlPath(value: string) {
    urlPath.update((o) => value)
  }

  const handleClick = (e: Event) => {
    browser.runtime.sendMessage({ action: "Hi from content script 👋" })
  }
  let inputScriptEl: HTMLTextAreaElement
  let outputScriptEl: HTMLTextAreaElement

  export let options = {
    ocls: "default",
    display: "flex",
    // validCoursePage: $validCoursePage,
    slug: getCourseSlugByPath($urlPath),
    outputScript: "",
    outputScriptCls: "",
    inputScriptCaller: "",
    inputScriptDefaultValue: "",
  }

  // onMount(()=>{
  //   console.log(`isCoursePage ${$validCoursePage}`)
  // })

  export const runScript = async () => {
    let is: InputScriptInterface = {
      cmd: "getCourseInfo",
      param: null,
      ocls: createRandCls("os"),
    }
    const caller = inputScriptEl.value
    options.inputScriptCaller = caller

    try {
      is = JSON.parse(inputScriptEl.value)
      // console.log(is)
      const method = is.cmd
      const param = is.param || null
      const ocls = is.ocls || "default"

      if (hasMethod(topWindow, method)) {
        // this.setState({ocls})
        const result = await topWindow[method](param)
        // console.log(result)
        options = { ...options, outputScript: new Date().getTime().toString(), outputScriptCls: ocls }
        try {
          options.outputScript = recursiveJSONStringify(result)
          if (options.outputScript.length / 1024 > 1000) {
            setTimeout(() => {
              options.outputScript = `{cleared:'to save memory'}`
            }, 5000)
          }
        } catch (e) {
          console.error(e)
        }
      } else {
        console.error(`ContentScriptApp doesnt have any method called ${method}`)
      }
      console.log(is)
    } catch (e) {
      console.error(e)
    }
  }
  const handleExecButton = (e: Event) => {}
  const handleOnInputScriptCallerChange = (e: Event) => {}
  const handlerOnInputScriptChange = (e: Event) => {}
</script>

<div id={containerId}>
  {#if $validCoursePage}
    <span>{getCourseSlugByPath($urlPath)}</span>
  {:else}
    <span>Extension is ready</span>
  {/if}

  <textarea placeholder="Input script" id="input-script" bind:value={options.inputScriptDefaultValue} bind:this={inputScriptEl} on:change={handlerOnInputScriptChange}></textarea>
  <textarea placeholder="Input script caller" id="input-script-caller" bind:value={options.inputScriptCaller} on:change={handleOnInputScriptCallerChange}></textarea>
  <textarea placeholder="Output script" id="output-script" class={options.outputScriptCls} bind:value={options.outputScript} bind:this={outputScriptEl}></textarea>
  <div class="action-container">
    <div class="course-page-checker">
      {#if $validCoursePage}
        This is a valid course page
      {:else}
        This is not a course page
      {/if}
    </div>
    <div class="btn-container">
      <button id="exec-button" on:click={handleExecButton}> Execute Page Fn </button>
    </div>
  </div>
  <CoursePageChecker validCoursePage={$validCoursePage} />
</div>

<style>
  #input-script,
  #input-script-caller,
  #output-script {
    color: #ffffff;
    display: block;
    border: solid 1px #fff;
  }
  #content-script-app {
    flex-direction: column;
    width: 400px;
    position: absolute;
    background: #000;
    color: #fff;
    z-index: 2001;
    opacity: 0.7;
    font-family: monospace;
    margin-top: 3.1em;
    margin-left: 22%;
    padding: 1em;
  }
  .action-container {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: space-between;
  }
  .course-page-checker,
  .btn-container {
    padding: 2px;
  }
  #exec-button {
    padding: 2px;

    background: #fff;
    color: #000;
  }
</style>
