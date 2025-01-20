<script lang="ts">
  import Toast from "@/global/components/ux/Toast.svelte"
  import { onMount } from "svelte"
  import FetchStateInfo from "./add-course-page/FetchStateInfo.svelte"
  import { getUrlSearchParams } from "@/global/fn/getUrlSearchParams"
  import MSetting from "@/global/db/models/MSetting"
  import { writable } from "svelte/store"
  import type DBStore from "@/global/db/DBStore"
  import PrxCache from "@/global/classes/PrxCache"
  import { createDownloadFile } from "@/global/fn/createDownloadFile"
  import { getM3RecByType } from "@/content-scripts/inject/fn/legacy/getM3RecByType"

  export let store: DBStore
  export let params: any = null
  export let queryString: string = ""

  let toastRef: Toast
  const loading = writable(true)
  const mSetting = store.get("Setting") as MSetting
  const mPrxCache = PrxCache.getInstance()

  store.onReady(() => loading.set(false))

  onMount(() => {
    if (store.isReady()) loading.set(false)
  })

  async function onFetch() {
    const searchParams = getUrlSearchParams(queryString) as any
    // console.log(searchParams.legacyMode)
    const legacyMode = searchParams.legacyMode === "true"
    const { slug } = params

    try {
      if (legacyMode) {
        const result = await mPrxCache.get(slug)
        const ds = result.content
        // createDownloadFile(JSON.stringify(ds), "legacy-m3rec.json")
        const rows = getM3RecByType("com.linkedin.learning.api.deco.content.Course", ds)
        console.info({ rows, ds })
      } else {
        // Implement non-legacy mode fetch logic here
      }
      toastRef.add("Fetch completed successfully")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastRef.add(`Error during fetch: ${error.message}`, "error")
      } else {
        toastRef.add("An unknown error occurred during fetch", "error")
      }
    }
  }

  function onRetry() {
    onFetch()
  }
</script>

<Toast bind:this={toastRef} />

{#if $loading}
  <span><i class="fa fa-spin fa-spinner" /></span>
{:else}
  <div class="add-course-page">This is add course-page</div>
  <FetchStateInfo
    name="Course Info"
    {onFetch}
    {onRetry}
  />
{/if}
