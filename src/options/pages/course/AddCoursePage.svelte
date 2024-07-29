<script lang="ts">
  // import Button from "@/global/components/ux/Button.svelte"

  import Toast from "@/global/components/ux/Toast.svelte"
  import { onMount } from "svelte"
  import FetchStateInfo from "./add-course-page/FetchStateInfo.svelte"
  import { getUrlSearchParams } from "@/global/fn/getUrlSearchParams"
  import MSetting from "@/global/db/models/MSetting"
  import { writable } from "svelte/store"

  export let params: any = null
  export let queryString: string = ""
  let toastRef: Toast
  const loading = writable(true)
  const mSetting = MSetting.getInstance()
  onMount(() => {
    toastRef.add("This is toast message")
    Promise.all([mSetting.initOrm()]).then(() => {
      loading.update((o) => false)
    })
  })
  function isLegacyMode() {
    const queryStringObj = getUrlSearchParams(queryString) as any
    return queryStringObj.legacyMode === "true"
  }
  async function onFetch() {
    const legacyMode = isLegacyMode()
    const courseSlug = await mSetting.get("last-course-slug")
    if (legacyMode) {
      console.log(`onFetch`, { courseSlug })
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
  <FetchStateInfo name="Course Info" {onFetch} {onRetry} />
{/if}
