<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { ToastItemInterface } from "./types"

  export let toast: ToastItemInterface
  let clockTimeout: number = 0
  const dispatch = createEventDispatcher()

  export function setHidden(hidden: boolean) {
    toast.hidden = hidden
    dispatch("update", { toast })
  }

  export function setClockTimeout(clock: number) {
    clockTimeout = clock
    dispatch("update", { clockTimeout })
  }

  $: displayCls = toast.hidden ? "hidden" : ""
</script>

<div class={`my-1 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 ${displayCls}`} role="alert">
  <div class="flex p-4">
    <div class="flex-shrink-0">
      <svg
        class="flex-shrink-0 h-4 w-4 {toast.kind === 'normal'
          ? 'text-blue-500'
          : toast.kind === 'success'
            ? 'text-teal-500'
            : toast.kind === 'error'
              ? 'text-red-500'
              : toast.kind === 'warning'
                ? 'text-yellow-500'
                : ''} mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        {#if toast.kind === "normal"}
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        {:else if toast.kind === "success"}
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        {:else if toast.kind === "error"}
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
          />
        {:else if toast.kind === "warning"}
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          />
        {:else if toast.kind === "closable"}
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        {/if}
      </svg>
    </div>
    <div class="ms-3">
      <p class="text-sm text-gray-700 dark:text-gray-400">{clockTimeout} {toast.message}</p>
    </div>
  </div>
</div>
