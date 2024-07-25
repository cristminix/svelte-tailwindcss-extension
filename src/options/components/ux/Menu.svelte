<script lang="ts">
  import MCourse from "@/global/db/models/MCourse"
  import { cls14 } from "./cls"
  import MenuItem from "./MenuItem.svelte"
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  const loading = writable(true)
  export let data: any
  export let routeApp: any
  export let store: any
  export let config: any
  const DEV_MODE = import.meta.env.DEV
  const isHidden = (item: any) => {
    if (item.hidden) return true
    if (DEV_MODE && item.dev) return false
    if (!DEV_MODE && item.dev) return false
    return false
  }
  const mCourse = MCourse.getInstance()
  const getChildrenByModel = (item: any) => {
    // console.log(item, index)
    if (item.model === "Course") {
      const courseList = mCourse.getAll().map((item: any) => {
        item.path = `/course/display/${item.slug}`
        return item
      })
      console.log(courseList)
      return courseList
    }
    return []
  }
  onMount(() => {
    mCourse.initOrm().then(() => {
      if (mCourse.ready) {
        loading.update((o) => false)
      }
    })
  })
</script>

{#if $loading}
  loading ...
{:else}
  <ul class={cls14}>
    {#each data as item, index}
      {@const hidden = isHidden(item)}
      {#if !hidden}
        {#if item.useModel}
          {@const childrens = getChildrenByModel(item)}
          {@const hasChild = true}
          <MenuItem {routeApp} {childrens} name={item.slug} {index} {hasChild} title={item.title} path={item.path} icon={item.iconCls} />
        {:else}
          <MenuItem {routeApp} childrens={item.children} name={item.slug} {index} hasChild={item.hasChild} title={item.title} path={item.path} icon={item.iconCls} />
        {/if}
      {/if}
    {/each}
  </ul>
{/if}
