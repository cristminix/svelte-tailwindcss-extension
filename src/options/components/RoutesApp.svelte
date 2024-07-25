<script lang="ts">
  import { writable } from "svelte/store"
  import * as idb from "idb-keyval"
  import { onMount } from "svelte"

  export const url = writable("/?hello=1&supreme=2")
  const lastPath = writable("")
  const lastQueryString = writable<string | null>(null)
  export const setUrl = (targetUrl: string) => {
    url.update((o) => targetUrl)
  }
  export const getRoute = (url: string | null = null): [string, string | null] => {
    const currentUrl = !url ? $url : url
    const routeSplit = currentUrl.split("?")

    let path: string = ""
    let queryString: string | null = null
    path = routeSplit[0]

    if (routeSplit.length > 1) {
      queryString = routeSplit[1]
    }
    return [path, queryString]
  }
  export const setRoute = (newUrl: string) => {
    idb.set("route.url", newUrl)
    url.update((value) => newUrl)
  }
  export let onRouteChange = (path: string, queryString: string | null) => {
    console.log(path, queryString)
  }
  url.subscribe((value) => {
    const [path, queryString] = getRoute(value)
    lastPath.update((o) => path)
    lastQueryString.update((o) => queryString)
    onRouteChange(path, queryString)
  })
  onMount(() => {
    const loadLastUrl = async () => {
      const lastUrl = await idb.get("route.url")
      if (lastUrl) setRoute(lastUrl as string)
    }
    loadLastUrl()
  })
</script>

<div>
  <label class="input input-bordered flex items-center gap-2">
    Address:
    <input bind:value={$url} type="text" class="grow" placeholder="url" />
  </label>
  <!-- <code>
    {$lastPath}
    {$lastQueryString}
  </code> -->
</div>
