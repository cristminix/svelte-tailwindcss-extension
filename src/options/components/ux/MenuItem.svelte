<script lang="ts">
  import { cls17, cls18, cls19, cls20, cls22, cls24, cls25 } from "./cls"
  import NavLink from "./NavLink.svelte"
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
  <li id={`${name}-accordion`} class="join join-vertical w-full" data-path={path.replace(/^\//, "")}>
    <div class="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name={`my-accordion-0`} checked={false} class=" " />
      <div class="collapse-title text-sm !pb-0"><i class={icon}></i> {title}</div>
      <div class="collapse-content p-1">
        <ul class={cls22}>
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
    <NavLink {routeApp} to={path} className={linkCls}>
      <i class={icon}></i>
      {title}
    </NavLink>
  </li>
{/if}
