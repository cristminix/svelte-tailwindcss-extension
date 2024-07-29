<script lang="ts">
  import Button from "@/global/components/ux/Button.svelte"
  import { writable } from "svelte/store"

  export let name: string
  export let onRetry: (event: Event) => void
  export let onFetch: (event: Event) => void

  export const resetState = () => {
    $runLevel = 0
    $statusCode = 0
    $loading = false
  }

  export const setMessage = (newMessage: string) => {
    $message = newMessage
  }

  export const setStatusCode = (newStatusCode: number) => {
    $statusCode = newStatusCode
  }

  export const setLoading = (isLoading: boolean) => {
    $loading = isLoading
  }

  export const setRunLevel = (newRunLevel: number) => {
    $runLevel = newRunLevel
  }
  let runLevel = writable(0)
  let statusCode = writable(0)
  let loading = writable(false)
  let message = writable("")
  let btnClsName = writable(name.toLowerCase().replace(/\W/g, "-"))
  let icon = writable(`Fetch ${name} success`)
  let hasError = writable(false)
  let success = writable(false)

  runLevel.subscribe((value) => {
    if ($runLevel === 0) {
      $icon = "fa fa-globe"
      $message = `Fetch ${name}`
    } else {
      if (!$loading) {
        if ($statusCode !== 200) {
          $icon = "fa fa-exclamation-triangle"
          $message = `Fetch ${name} failed`
          $hasError = true
          $success = false
        } else {
          $success = true
        }
      } else {
        $message = `Fetching ${name}`
        $icon = "fa fa-spin fa-spinner"
      }
    }
  })
</script>

<div class={`flex items-center w-full ${$hasError ? "text-red-200" : ""} ${$success ? "text-green-200" : ""}`}>
  <div class="p-2">
    <i class={$icon}></i>
  </div>
  <div class="p-2">{$statusCode}</div>
  <div class="p-2">{$message}</div>
  <div class="p-2">
    {#if $hasError}
      <Button className={$btnClsName} on:click={onRetry} caption="Retry" icon="fa fa-refresh" />
    {/if}
    {#if $runLevel === 0}
      <Button className={$btnClsName} on:click={onFetch} caption="Fetch" icon="fa fa-download" />
    {/if}
  </div>
</div>
