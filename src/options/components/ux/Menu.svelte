<script lang="ts">
  import { cls14 } from "./cls"
  import MenuItem from "./MenuItem.svelte"
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

  const getChildrenByModel = (item: any) => {
    return []
  }
</script>

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
