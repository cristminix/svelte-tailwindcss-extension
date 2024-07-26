export interface GridOptionsInterface {
  editUrl: string | (() => string)
  deleteUrl: string | (() => string)
  fields: string[]
  routeApp: any
  numberWidthCls: any
  actionWidthCls: any
  callbackFields: any
  useAutoEditor: boolean
  editors: any
  actions: any
  editorFactory: (editor: any, field: string, value: any, item: any, index: number, fieldIndex: number) => any
}

export interface GridActionsInterface {
  edit: any
}
export type OptionalParams = null | undefined
