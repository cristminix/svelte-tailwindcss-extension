<script lang="ts">
  import Fs from "@/global/classes/Fs"
  import Folder from "./file-manager/Folder.svelte"
  import useTraverseTree from "./file-manager/useTraverseTree"
  import type { TFolderItem, TIsSelectedFn, TOnSelectFn, TSetExpandFn } from "./types"
  import { crc32Id } from "@/global/fn/crc32Id"
  import { writable } from "svelte/store"
  import { onMount } from "svelte"
  import "./file-manager/style.css"
  let explorerData = writable<TFolderItem | TFolderItem[] | null>()
  type TExplorerState = {
    expanded: any
    selected: any
  }
  let explorerState = writable<TExplorerState>({ expanded: {}, selected: {} })
  const { insertNode } = useTraverseTree()
  const fs = new Fs("fs")
  const handleFolderFileCreation = (folderID: any, item: any, isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderID, item, isFolder)

    explorerData.update((o) => finalTree)
  }
  const isExpand = (id: string | number) => {
    return $explorerState.expanded[id] ? true : false
  }
  const setExpand: TSetExpandFn = (payload) => {
    // console.log(payload)
    // dispatch(setExpanded(payload))
  }
  const onSelectItem: TOnSelectFn = (id, path) => {
    console.log(id, path)
    // dispatch(setSelected({ id, path }))
  }
  const isSelected: TIsSelectedFn = (id) => {
    if (!$explorerState.selected) return false
    return $explorerState.selected.id === id
  }
  const walk = async (dstDir: string | null = null) => {
    let targetDir = !dstDir ? "/" : dstDir
    const isRootDir = targetDir === "/"
    const ls = await fs.readdirSync(targetDir)
    // console.log(ls)

    let output: TFolderItem | TFolderItem[] = {
      id: crc32Id(),
      name: targetDir,
      isFolder: true,
      items: [],
    }

    if (!isRootDir) {
      output = []
    }
    if (!Array.isArray(output)) output.isExpanded = isExpand(output.id)
    // output.selected = isSelected(output.id)

    for (const name of ls) {
      if (name === ".git") continue
      const absPath = `${targetDir === "/" ? "" : targetDir}/${name}`
      // console.log(absPath)
      const stat = await fs.statSync(absPath)
      // console.log(stat)
      const isFolder = stat.type === "dir"

      const item: TFolderItem = {
        id: crc32Id(),
        name,
        isFolder,
        path: absPath,
      }

      if (isFolder) {
        item.isExpanded = isExpand(item.id)

        item.items = (await walk(absPath)) as TFolderItem[]
      }
      if (isRootDir) {
        if (!Array.isArray(output)) {
          if (output.items) output.items.push(item)
        }
      } else {
        if (Array.isArray(output)) {
          output.push(item)
        }
      }
    }

    return output
  }
  const generateExplorerData = async () => {
    const data = await walk()
    // return data
    console.log(data)
    explorerData.update((o) => null)
    setTimeout(() => {
      explorerData.update((oData) => data)
    }, 256)
  }
  onMount(() => {
    generateExplorerData()
  })
</script>

<main class="file-explorer-app">
  <div class="left-side">
    {#if explorerData}
      <Folder {isSelected} onSelect={onSelectItem} {setExpand} data={$explorerData} isRoot={true} />
    {/if}
  </div>
  <div class="right-side">
    <slot />
  </div>
</main>
