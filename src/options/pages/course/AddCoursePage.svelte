<script lang="ts">
  // import Button from "@/global/components/ux/Button.svelte"

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
  store.onReady(() => {
    loading.update((o) => false)
  })
  onMount(() => {
    toastRef.add("This is toast message")
    if (store.isReady()) {
      loading.update((o) => false)
    }
  })
  function isLegacyMode() {
    const queryStringObj = getUrlSearchParams(queryString) as any
    return queryStringObj.legacyMode === "true"
  }
  async function onFetch() {
    const legacyMode = isLegacyMode()
    const { slug } = params
    if (legacyMode) {
      const result = await mPrxCache.get(slug)
      const ds = result.content
      // const keys = Object.keys(ds)
      // console.log(keys)
      createDownloadFile(JSON.stringify(ds), "legacy-m3rec.json")
      const rows = getM3RecByType("com.linkedin.learning.api.deco.content.Course", ds)
      console.info({ rows, ds })
      // console.log(`onFetch`, { cache })
    } else {
    }
  }
  function onRetry() {
    console.log(`onRetry`)
  }
</script>

<!-- <code>
  [{JSON.stringify(params)}]
</code> -->
<Toast bind:this={toastRef} />

{#if $loading}
  <span><i class="fa fa-spin fa-spinner" /></span>
{:else}
  <div class="add-course-page">This is add course-page</div>
  <!-- <Button caption="Caption" loading={false} icon="fa-solid fa-plus" /> -->
  <FetchStateInfo
    name="Course Info"
    {onFetch}
    {onRetry}
  />
{/if}
