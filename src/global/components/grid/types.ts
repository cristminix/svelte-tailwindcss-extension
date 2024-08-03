export interface GridOptionsInterface {
  editUrl?: string | (() => string)
  deleteUrl?: string | (() => string)
  fields: string[]
  routeApp: any
  numberWidthCls: any
  actionWidthCls: any
  callbackFields?: any
  useAutoEditor?: boolean
  editors?: any
  actions?: any
  widthCls?: any
  headers: string[]
  enableEdit: boolean
  callbackActions?: any
  callbackHeaders?: any
  enableActions?:boolean
  editorFactory?: (editor: any, field: string, value: any, item: any, index: number, fieldIndex: number) => any
}

export interface GridActionsInterface {
  edit: any
}
export type OptionalParams = null | undefined
export interface IGridData {
  records: any[]
  limit: number
  page: number
  totalPages: number
  totalRecords: number
  orderBy: string
  orderDir: string
}
