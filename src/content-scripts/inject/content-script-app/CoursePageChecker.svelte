<script lang="ts">
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import CheckerTag from "./CheckerTag.svelte"

  export let validCoursePage = writable(false)

  const checkers = writable("[]")
  const tree = writable(0)
  const maxTree = 10

  function updateTree() {
    console.log($validCoursePage)
    // if (typeof chrome !== "undefined") {
    //   console.log(chrome)
    // }

    tree.update((currentTree) => {
      let newTree = currentTree + 1
      if (newTree >= maxTree) {
        newTree = 1
      }
      buildTree(newTree)
      return newTree
    })
  }

  function buildTree(p: number) {
    const newCheckers: any[] = []
    let newCheckersP = newCheckers
    const childrens: any[] = []
    let i = 0
    while (p--) {
      if (newCheckersP.length === 0) {
        childrens.push([])
        newCheckersP.push(childrens[i])
        newCheckersP = childrens[i]
        i++
      }
    }
    const newCheckersStr = JSON.stringify(newCheckers)
    checkers.set(newCheckersStr)
  }

  function buildTreeTag(checker: any[]): any {
    const finalText = !validCoursePage ? "This is not a course page" : "This is a valid course page"
    if (checker.length) {
      return CheckerTag
    } else {
      return finalText
    }
  }

  let parsedCheckers: any[] = []

  $: parsedCheckers = JSON.parse($checkers)

  $: if (validCoursePage) {
    updateTree()
  }

  onMount(() => {
    updateTree()
  })
  validCoursePage.subscribe((value) => {
    if (value) {
      updateTree()
    }
  })
</script>

{#if $validCoursePage}
  <CheckerTag hasChildren={false}>END</CheckerTag>
{:else}
  {#each parsedCheckers as { index, item }}
    <CheckerTag hasChildren={true} />
  {/each}
{/if}

<style>
  /* Add your styles here */
</style>
