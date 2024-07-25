<script lang="ts">
  import { cls28 } from "./cls"

  export let store: any
  export let config: any
  const hideSidebar = false
  const mainContentCls = !hideSidebar ? `${cls28} pb-2` : `${cls28} lg:ps-8`
</script>

<div class={`${mainContentCls}`}>
  <slot />
</div>
