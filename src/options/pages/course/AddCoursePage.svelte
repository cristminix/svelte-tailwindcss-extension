<script lang="ts">
  // import CustomToast from "@/global/components/ux/CustomToast.svelte"
  import Toast from "@/global/components/ux/Toast.svelte"
  import type { ToastItemInterface } from "@/global/components/ux/types"
  import { onMount } from "svelte"

  export let params: any
  export let queryString: string = ""
  let toastRef: Toast
  const toast: ToastItemInterface = {
    hidden: false,
    message: "This is a toast",
    kind: "success",
  }
  onMount(() => {
    toastRef.add("This is toast message")
  })
</script>

<code>
  [{JSON.stringify(params)}]
</code>
<div class="add-course-page">This is add course-page</div>
<Toast bind:this={toastRef} />
