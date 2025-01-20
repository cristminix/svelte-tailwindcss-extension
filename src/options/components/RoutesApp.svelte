<script lang="ts">
  import { writable } from "svelte/store"
  import * as idb from "idb-keyval"
  import { onMount } from "svelte"

  const url = writable("")
  const lastPath = writable("")
  const lastQueryString = writable<string | null>(null)
  const pathname = writable("")
  const queryString = writable<string | null>("")
  export const setUrl = (targetUrl: string) => {
    idb.set("route.url", targetUrl)
    url.update((o) => targetUrl)
    const [path, _queryString] = getRoute(targetUrl)
    pathname.update((o) => path)
    queryString.update((o) => _queryString)
  }
  export const setRoute = (newUrl: string) => {
    setUrl(newUrl)
  }
  export function useLocation() {
    return {
      url: $url,
      pathname: $pathname,
      queryString: $queryString,
    }
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
  let routeChangeCallbacks: any = {}
  let routeChangeCallbacksKeep: any = {}
  export const addRouteChangeCallback = (callback: any, key: string, keep = false) => {
    routeChangeCallbacks[key] = callback
    routeChangeCallbacksKeep[key] = keep
  }
  export let onRouteChange = (path: string, queryString: string | null) => {
    console.log(path, queryString)
  }
  export function triggerRouteChange(path: string, queryString: string | null) {
    Object.keys(routeChangeCallbacks).forEach((key) => routeChangeCallbacks[key](path, queryString))
  }
  url.subscribe((value) => {
    const [path, queryString] = getRoute(value)
    lastPath.update((o) => path)
    lastQueryString.update((o) => queryString)
    onRouteChange(path, queryString)
  })
 
  let routeChangesTimer:any = null
  let routeChangesClock:number = 0
  const routeChangesTimeout:number = 3000
  const watchRouteChanges = ()=>{
    if(routeChangesTimer) return
    clearInterval(routeChangesTimer)
    routeChangesTimer = setInterval(async ()=>{
      // console.log(`route changes watcher is running ${routeChangesClock}`)
      routeChangesClock+=1
      const lastUrl = await idb.get("route.url")
      if (lastUrl && lastUrl != $url) setRoute(lastUrl as string)
    },routeChangesTimeout)

  }

  onMount(() => {
    const loadLastUrl = async () => {
      const lastUrl = await idb.get("route.url")
      if (lastUrl) setRoute(lastUrl as string)
    }
    loadLastUrl()
    watchRouteChanges()
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
