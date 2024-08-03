<script lang="ts">
  import { makeDelay } from "@/global/fn/makeDelay"
  import { onMount, beforeUpdate } from "svelte"
  // import DBEditorBoolean from "./db-editor/DBEditorBoolean.svelte";
  // import DBEditorInteger from "./db-editor/DBEditorInteger.svelte";
  // import DBEditorObject from "./db-editor/DBEditorObject.svelte";
  // import DBEditorString from "./db-editor/DBEditorString.svelte";
  // import Pager from "@/components/shared/Pager.svelte";
  // import Grid from "@/components/shared/Grid.svelte";
  // import { makeDelay } from "@/global/fn";
  import config from "./config.json"
  import GridTable from "@/global/components/grid/GridTable.svelte"
  import Pager from "@/global/components/grid/Pager.svelte"
  import type { GridOptionsInterface } from "@/global/components/grid/types"

  export let store
  export let table
  export let page
  export let routeApp: any

  let model: any = null
  let conf: any = null
  let errorMessage = ""
  let projectList: any[] = []
  let editorFactoryRefs: any = {}
  let grid = {
    records: [],
    limit: 5,
    page: 1,
    total_pages: 0,
    total_records: 0,
    order_by: "key",
    order_dir: "asc",
  }

  const delay = makeDelay(256)

  const updateList = async (pageNumber: number) => {
    let nGrid = {
      records: [],
    }
    grid = {
      ...grid,
      ...nGrid,
    }
    await delay(() => {
      nGrid = {
        records: model[conf.listMethod](),
      }
      grid = {
        ...grid,
        ...nGrid,
      }
    })
  }

  onMount(() => {
    if (table) {
      setModelAndConf()
    }
  })

  beforeUpdate(() => {
    if (model) {
      updateList(page ?? 1)
    } else {
      errorMessage = "No Model Set"
    }
  })

  const setModelAndConf = () => {
    model = null
    conf = null
    const tables = config.tables as any
    const tableConf = tables[table]
    if (tableConf) {
      const modelName = tableConf.model
      const modelSet = store.get(modelName)
      conf = tableConf
      model = modelSet
    } else {
      errorMessage = `No config set for ${table} table`
    }
  }

  const onRefresh = async (e: any, setLoading: any) => {
    setLoading(true)
    await updateList(grid.page)
    setLoading(false)
  }

  const editorFactory = (editor: any, field: any, value: any, item: any, index: number, fieldIndex: number) => {
    if (!editorFactoryRefs[`${index}-${fieldIndex}-${field}`]) {
      editorFactoryRefs[`${index}-${fieldIndex}-${field}`] = null
    }
    const ref = editorFactoryRefs[`${index}-${fieldIndex}-${field}`]
    const components: any = {
      // boolean: <DBEditorBoolean {item} {field} {value} bind:this={ref} />,
      // string: <DBEditorString {item} {field} {value} bind:this={ref} />,
      // object: <DBEditorObject {item} {field} {value} bind:this={ref} />,
      // integer: <DBEditorInteger {item} {field} {value} bind:this={ref} />,
    }
    const editorComponent = components[editor]
    return editorComponent
  }

  const onCancelRow = async (item: any, index: number, options: any, linkCls: string, gridAction: any) => {
    options.fields.map((field: any, fieldIndex: number) => {
      const editor = editorFactoryRefs[`${index}-${fieldIndex}-${field}`]
      editor.cancelRow()
    })
    gridAction.setState({ editMode: false })
  }

  const onEditRow = async (item: any, index: number, options: any, linkCls: string, gridAction: any) => {
    options.fields.map((field: any, fieldIndex: number) => {
      const editor = editorFactoryRefs[`${index}-${fieldIndex}-${field}`]
      const editMode = editor.state.editMode
      if (!editMode) {
        editor.editRow()
      } else {
        editor.saveRow()
      }
    })
    const editMode = gridAction.state.editMode
    gridAction.setState({ editMode: !editMode })
  }

  const getLinkButton = () => {
    /* return (
      <button   on:click={() => onEditRow()}>
        <i class="bi bi-pencil-square"></i> Ubah
      </button>
    )
    */
  }

  const gridOptions: GridOptionsInterface = {
    routeApp,
    numberWidthCls: "",
    actionWidthCls: "",
    widthCls: ["3/8", "5/8"],
    headers: ["Setting", "Value"],
    fields: ["key", "value"],
    enableEdit: true,
    callbackFields: {},
    useAutoEditor: true,
    callbackActions: {
      edit: (item: any, index: number, options: any, linkCls: string, gridAction: any) => {
        /*
        return (
          <>
            <button class={linkCls} on:click={(evt) => onEditRow(item, index, options, linkCls, gridAction)}>
              <i class="bi bi-pencil-square"></i>
              {gridAction.state.editMode ? "Save" : "Edit"}
            </button>
            {gridAction.state.editMode && (
              <button class={"ml-2 " + linkCls} on:click={(evt) => onCancelRow(item, index, options, linkCls, gridAction)}>
                <i class="bi bi-x-circle"></i> Cancel
              </button>
            )}
          </>
        )
          */
      },
    },
  }

  if (model) {
    gridOptions.headers = conf.headers
    gridOptions.fields = conf.fields
    gridOptions.editors = conf.editors
    gridOptions.editorFactory = editorFactory
  }
</script>

{#if model}
  <div class="border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700" id={`db-table-explorer-${table}`}>
    <div class="flex flex-col">
      <div
        class="-m-1.5 overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div>
            <GridTable options={gridOptions} records={grid.records} page={grid.page} limit={grid.limit} />
          </div>
        </div>
      </div>
      <div class="pager-container mt-3">
        <Pager path={`/database/${table}`} page={grid.page} total_pages={grid.total_pages} limit={grid.limit} {onRefresh} />
      </div>
    </div>
  </div>
{:else}
  {errorMessage}
{/if}
