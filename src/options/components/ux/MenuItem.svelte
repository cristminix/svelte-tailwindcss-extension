<script lang="ts">
  import NavLink from "@/global/components/ux/NavLink.svelte"
  import { cls17, cls18, cls19, cls20, cls22, cls24, cls25 } from "./cls"
  export let routeApp: any
  export let hasChild: boolean
  export let title: string
  export let path: string
  export let icon: string
  export let name: string
  export let childrens: any
  export let index: number
  const activeTabCls = "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md dark:bg-gray-900 dark:text-white"
  const activeMenuCls = "bg-gray-100 text-sm text-slate-700 rounded-md dark:bg-gray-900 dark:text-white"
  const inactiveTabCls = cls24 + " hover:bg-gray-100  hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
  const linkCls = /*isActive ? activeTabCls : */ inactiveTabCls
  //   const { pathname } = useLocation()
  const pathname = ""
</script>

{#if hasChild}
  <!-- 
<div class="join join-vertical w-full">
  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" checked="checked" />
    <div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
    <div class="collapse-content">
      <p>hello</p>
    </div>
  </div>

 -->
  <li id={`${name}-accordion`} class="join join-vertical w-full accordion-item" data-path={path.replace(/^\//, "")}>
    <div class="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name={`my-accordion-0`} checked={false} class="!min-h-2" />
      <div class="collapse-title text-sm !after:bg-blue-300"><i class={icon}></i> {title}</div>
      <div class="collapse-content">
        <ul class={`${cls22} !p-0`}>
          {#each Object.keys(childrens) as key}
            {@const item = childrens[key]}
            {#if !item.hidden}
              <svelte:self {routeApp} childrens={item.childItems || {}} name={key} hasChild={item.hasChild} title={item.title} path={item.path} icon={item.iconCls} />
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </li>
{:else}
  <li>
    <NavLink {routeApp} to={path} className={`${linkCls} !px-5 my-2`}>
      <i class={icon}></i>
      {title}
    </NavLink>
  </li>
{/if}

<style>
  .collapse-arrow > .collapse-title {
    padding: 12px 18px;
    min-height: 28px;
  }
  .collapse-arrow > .collapse-title::after {
    top: 22px;
  }
  .collapse-content {
    padding: 0 12px 0px 12px;
    margin-bottom: 0px;
  }
  .cls-22 {
    margin-bottom: 12px;
  }
  .accordion-item {
    /* margin-top: 0 !important; */
    /* margin-bottom: 0 !important; */
  }
</style>
