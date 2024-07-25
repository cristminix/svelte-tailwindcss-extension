<script lang="ts">
  import { cls0 } from "./cls"
  import Content from "./Content.svelte"
  import Sidebar from "./Sidebar.svelte"
  import SidebarToggle from "./SidebarToggle.svelte"

  export let store: any = null
  export let config: any = null
  export let routeApp: any
</script>

<div class={cls0}>
  <!-- ========== MAIN CONTENT ========== -->
  <!-- <DialogContent ref={dialogContentRef} /> -->

  <SidebarToggle {store} {config} />
  <Sidebar {store} {config} {routeApp} />
  <Content {store} {config}>
    <slot />
  </Content>

  <!-- ========== END MAIN CONTENT ========== -->
</div>
