import initSqlJs from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"
import { count, sql, eq, and, asc, desc, like, or } from "drizzle-orm"
import { isBrowser } from "@/global/fn/isBrowser"
import { calculateTotalPages } from "@/global/fn/calculateTotalPages"
import { calculateOffset } from "@/global/fn/calculateOffset"
import type Fs from "./Fs"
export type SearchType = "single" | "all" | null
// import * as schema from "../../schema/schema"
// import { isBrowser } from "../../../../fn/isBrowser"
// import { calculateTotalPages } from "../../../../fn/calculateTotalPages"
// import { calculateOffset } from "../../../../fn/calculateOffset"
const getWasmUrl = (file: string) => {
  //   console.log(file)
  // return `/web/data/sql/${file}`
  return `https://sql.js.org/dist/${file}`
}

class DrizzleBaseModelRw {
  wasmPath = "web/data/sql/sql-wasm.wasm"
  pk: string = "id"
  path: string | null = null
  // git = null
  fs: Fs | null = null
  schema: any = null
  db: any = null
  logger: any = null
  ready = false
  dir: string | null = null
  sqldb: any = null
  searchFields: any[] = []
  defaultOrder: any

  constructor(fs: Fs, schema: any) {
    this.fs = fs
    this.schema = schema
  }

  getSearchFields() {
    const allFields = Object.keys(this.schema)

    if (this.searchFields.length === 0) {
      for (const field of allFields) {
        if (this.schema[field].dataType === "string") this.searchFields.push(field)
      }
    }

    return this.searchFields
  }

  isValidOrder(order: any) {
    const validValue = typeof order === "object" && order !== null
    if (!validValue) return false
    const allFields = Object.keys(this.schema)
    const fields = Object.keys(order)
    if (fields.length > 1) {
      console.log(`Warning: order field > 1 left is unused`)
    }
    if (fields.length > 0) {
      const [field] = fields
      const direction = order[field]

      return allFields.includes(field) && ["asc", "desc"].includes(direction)
    }
    return false
  }
  isValidFilter(filter: any) {
    return typeof filter === "object" && filter !== null
  }

  isValidSearch(search: any) {
    const validValue = typeof search === "object" && search !== null
    if (!validValue) return false
    const validSearchQuery = typeof search.query === "string" && search.query.length > 0
    const validSearchType = ["single", "all"].includes(search.type)
    const searchType = validSearchType ? search.type : "all"
    let checkSearchField = true
    const allFields = Object.keys(this.schema)

    if (searchType === "single") {
      checkSearchField = allFields.includes(search.field)
    }
    return validSearchQuery && checkSearchField
  }
  isValidPage(page: number) {
    return page && page !== null
  }
  addQueryOrder(order: any) {
    const fields = Object.keys(order)
    const [field] = fields
    const direction = order[field]
    const orderBy = direction === "asc" ? asc(this.schema[field]) : desc(this.schema[field])
    return orderBy
  }
  addQueryFilter(filter: any) {
    const allFields = Object.keys(this.schema)
    const fields = Object.keys(filter)
    if (fields.length > 1) {
      console.log(`Warning: filter field > 1 left is unused`)
    }
    let conditionArr = []

    for (const field of fields) {
      if (allFields.includes(field)) {
        conditionArr.push(eq(this.schema[field], filter[field]))
        // break
      } else {
        console.log(`invalid filter ${field} not exists in [${allFields.join(",")}]`)
      }
    }
    if (conditionArr.length > 0) return and.apply(this, conditionArr)
    return null
  }
  addQuerySearch(searchFields: any, searchQuery: any) {
    const likes = []
    for (const field of searchFields) {
      likes.push(like(this.schema[field], `%${searchQuery}%`))
    }
    if (likes.length > 0) return or.apply(this, likes)
    return null
  }
  async count(filter = null, search = null) {
    let result = null
    if (this.isValidFilter(filter)) {
      let condition = this.addQueryFilter(filter)
      result = await this.db
        .select({ count: count(this.schema.id) })
        .from(this.schema)
        .where(condition)
      const [row] = result
      if (row) return row.count
      return 0
    }

    return await this.countAll()
  }
  async countAll() {
    const result = await this.db.select({ count: count() }).from(this.schema)
    const [row] = result
    if (row) return row.count
    return 0
  }
  async commit(push = false) {
    const arrBuffer = this.sqldb.export()
    console.log(`Write ${this.path}`)
    // await this.git.commit([this.path])
    try {
      // await this.fs.writeFileSync(this.getDbPath(), arrBuffer)
    } catch (e) {
      // console.log(`lfs:error cant write ${this.path}`, e)
    }
    if (push) {
      // await this.git.push()
    }
  }
  getDbPath() {
    return `${this.dir}/${this.path}`
  }
  getWasmPath() {
    return `${this.dir}/${this.wasmPath}`
  }
  async initOrm() {
    if (this.ready) return

    const dbpath = this.getDbPath()
    const sqlWasmGitPath = this.getWasmPath()
    console.log(`orm:try to read ${dbpath}`)
    try {
      if (this.fs) {
        const filebuffer = await this.fs.readFileSync(dbpath)

        const sqlPromise = await initSqlJs({
          locateFile: (file) => (isBrowser() ? getWasmUrl(file) : sqlWasmGitPath),
        })

        this.sqldb = new sqlPromise.Database(filebuffer as Buffer)
        const db = drizzle(this.sqldb, { schema: this.schema })
        this.db = db
        this.ready = true
      }
    } catch (e) {
      console.error(e)
    }
  }

  getAll() {
    return this.db.select().from(this.schema).all()
  }
  async getRecords(orderBy: any) {
    return await this.db.select().from(this.schema).orderBy(orderBy)
  }
  async getRecords_withPage(orderBy: any, limit: number, offset: number) {
    return await this.db.select().from(this.schema).orderBy(orderBy).limit(limit).offset(offset)
  }
  async getRecordsWithFilter(orderBy: any, condition: any) {
    return await this.db.select().from(this.schema).where(condition).orderBy(orderBy)
  }
  async getRecordsWithFilter_withPage(orderBy: any, limit: number, offset: number, condition: any) {
    // console.log(limit,offset,condition)
    return await this.db.select().from(this.schema).where(condition).orderBy(orderBy).limit(limit).offset(offset)
  }
  async getRecordsWithSearch(orderBy: any, searchType: SearchType, searchField: string, searchQuery: string) {
    let records = []

    if (searchType === "single") {
      records = await this.db
        .select()
        .from(this.schema)
        .where(like(this.schema[searchField], `%${searchQuery}%`))
        .orderBy(orderBy)
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery)
      records = await this.db.select().from(this.schema).where(searchCondition).orderBy(orderBy)
    }
    return records
  }

  async getRecordsWithSearch_withPage(orderBy: any, limit: number, offset: number, searchType: SearchType, searchField: string, searchQuery: string) {
    let records = []
    if (searchType === "single") {
      records = await this.db
        .select()
        .from(this.schema)
        .where(like(this.schema[searchField], `%${searchQuery}%`))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset)
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery)
      records = await this.db.select().from(this.schema).where(searchCondition).orderBy(orderBy).limit(limit).offset(offset)
    }
    return records
  }
  async getRecordsWithSearch_withFilter_withPage(orderBy: any, condition: any, limit: number, offset: number, searchType: SearchType, searchField: string, searchQuery: string) {
    let records = []

    if (searchType === "single") {
      records = await this.db
        .select()
        .from(this.schema)
        .where(and(condition, like(this.schema[searchField], `%${searchQuery}%`)))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset)
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery) as any
      records = await this.db.select().from(this.schema).where(and(condition, searchCondition)).orderBy(orderBy).limit(limit).offset(offset)
    }
    return records
  }
  async getRecordsWithSearch_with_filter(orderBy: any, condition: any, searchType: SearchType, searchField: string, searchQuery: string) {
    let records = []

    if (searchType === "single") {
      records = await this.db
        .select()
        .from(this.schema)
        .where(and(condition, like(this.schema[searchField], `%${searchQuery}%`)))
        .orderBy(orderBy)
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery) as any
      records = await this.db.select().from(this.schema).where(and(condition, searchCondition)).orderBy(orderBy)
    }
    return records
  }
  async getRow(pk: number | string) {
    let condition
    if (typeof pk === "object" && pk !== null) {
      const objectParam = pk
      const validFilter = this.isValidFilter(objectParam)
      if (!validFilter) return null
      condition = this.addQueryFilter(objectParam)
    } else {
      condition = this.addQueryFilter({ [this.pk]: pk })
    }
    const result = this.db.select().from(this.schema).where(condition)

    return result.get(0)
  }
  getListParam(limit: any, page: any, order: any, filter: any, search: any) {
    if (typeof limit === "object" && limit !== null) {
      const objectParam = limit

      limit = objectParam.limit ?? 5
      page = objectParam.page ?? 1
      order = objectParam.order ?? null
      filter = objectParam.filter ?? null
      search = objectParam.search ?? null
    }

    const defaultOrder = this.defaultOrder ?? { [this.pk]: "asc" }
    const orderBy = this.addQueryOrder(this.isValidOrder(order) ? order : defaultOrder)

    const validSearch = this.isValidSearch(search)

    let searchQuery, searchType, searchField
    if (validSearch) {
      searchType = search.type
      searchField = search.field
      searchQuery = search.query
    }
    const hasFilter = this.isValidFilter(filter)
    const hasSearch = validSearch
    const hasPage = this.isValidPage(page)
    const hasSearchAndFilter = hasFilter && hasSearch
    // priority is search,filter,default
    return {
      limit,
      page,
      order,
      filter,
      search,
      orderBy,
      validSearch,
      searchType,
      searchField,
      searchQuery,
      hasFilter,
      hasSearch,
      hasPage,
      hasSearchAndFilter,
    }
  }
  async getCountWithSearch_withFilter_withPage(condition: any, limit: number, offset: number, searchType: SearchType, searchField: string, searchQuery: string) {
    if (searchType === "single") {
      let result = await this.db
        .select({ pk: this.schema[this.pk] })
        .from(this.schema)
        .where(and(like(this.schema[searchField], `%${searchQuery}%`)), condition)
        .limit(limit)
        .offset(offset)
      result = [...result]
      return result.length
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery) as any
      let result = await this.db.select({ pk: this.schema[this.pk] }).from(this.schema).where(and(searchCondition, searchCondition)).limit(limit).offset(offset)
      result = [...result]
      return result.length
    }
  }
  async getCountWithSearch_with_filter(condition: any, searchType: SearchType, searchField: string, searchQuery: string) {
    let result
    if (searchType === "single") {
      result = await this.db
        .select({ count: count(this.schema.id) })
        .from(this.schema)
        .where(and(like(this.schema[searchField], `%${searchQuery}%`)), condition)
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery) as any

      result = await this.db
        .select({ count: count(this.schema.id) })
        .from(this.schema)
        .where(and(condition, searchCondition))
    }
    const [row] = result
    if (row) return row.count
    return 0
  }
  async getCountWithSearch_withPage(limit: number, offset: number, searchType: SearchType, searchField: string, searchQuery: string) {
    if (searchType === "single") {
      let result = await this.db
        .select({ pk: this.schema[this.pk] })
        .from(this.schema)
        .where(like(this.schema[searchField], `%${searchQuery}%`))
        .limit(limit)
        .offset(offset)
      result = [...result]
      return result.length
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery)
      let result = await this.db.select({ pk: this.schema[this.pk] }).from(this.schema).where(searchCondition).limit(limit).offset(offset)
      result = [...result]
      return result.length
    }
  }
  async getCountWithSearch(searchType: SearchType, searchField: string, searchQuery: string) {
    let result
    if (searchType === "single") {
      result = await this.db
        .select({ count: count(this.schema.id) })
        .from(this.schema)
        .where(like(this.schema[searchField], `%${searchQuery}%`))
    } else {
      const searchFields = this.getSearchFields()
      const searchCondition = this.addQuerySearch(searchFields, searchQuery)
      result = await this.db
        .select({ count: count(this.schema.id) })
        .from(this.schema)
        .where(searchCondition)
    }
    const [row] = result
    if (row) return row.count
    return 0
  }
  async getCountWithFilter_withPage(limit: number, offset: number, condition: any) {
    let result = await this.db.select({ pk: this.schema[this.pk] }).from(this.schema).where(condition).limit(limit).offset(offset)
    result = [...result]
    return result.length
  }
  async getCountWithFilter(condition: any) {
    const result = await this.db
      .select({ count: count(this.schema.id) })
      .from(this.schema)
      .where(condition)
    const [row] = result
    if (row) return row.count
    return 0
  }
  async getCount_withPage(limit: number, offset: number) {
    let result = await this.db.select({ pk: this.schema[this.pk] }).from(this.schema).limit(limit).offset(offset)
    result = [...result]
    return result.length
  }
  async getState(_limit = 5, _page = null, _filter = null, _search = null) {
    let { limit, page, order, filter, search, orderBy, validSearch, searchType, searchField, searchQuery, hasFilter, hasSearch, hasPage, hasSearchAndFilter } = this.getListParam(
      _limit,
      _page,
      null,
      _filter,
      _search
    )

    const totalRecords = await this.countAll()
    const totalPages = calculateTotalPages(totalRecords, limit)
    const offset = calculateOffset(page, limit)

    let recordCount = 0

    if (hasSearchAndFilter) {
      let condition = this.addQueryFilter(filter)

      if (hasPage) {
        recordCount = await this.getCountWithSearch_withFilter_withPage(condition, limit, offset, searchType, searchField, searchQuery)
      } else {
        recordCount = await this.getCountWithSearch_with_filter(condition, searchType, searchField, searchQuery)
      }
    } else if (hasSearch) {
      if (hasPage) {
        recordCount = await this.getCountWithSearch_withPage(limit, offset, searchType, searchField, searchQuery)
      } else {
        recordCount = await this.getCountWithSearch(searchType, searchField, searchQuery)
      }
    } else if (hasFilter) {
      let condition = this.addQueryFilter(filter)

      if (hasPage) {
        // console.log("here")
        recordCount = await this.getCountWithFilter_withPage(limit, offset, condition)
      } else {
        recordCount = await this.getCountWithFilter(condition)
      }
    } else {
      if (hasPage) {
        recordCount = await this.getCount_withPage(limit, offset)
      } else {
        recordCount = await this.countAll()
      }
    }

    return {
      limit,
      totalPages,
      totalRecords,
      recordCount,
    }
  }
  async getList(_limit = 5, _page = 1, _order = null, _filter = null, _search = null) {
    let { limit, page, order, filter, search, orderBy, validSearch, searchType, searchField, searchQuery, hasFilter, hasSearch, hasPage, hasSearchAndFilter } = this.getListParam(
      _limit,
      _page,
      _order,
      _filter,
      _search
    )

    const totalRecords = await this.countAll()
    const totalPages = calculateTotalPages(totalRecords, limit)

    let records = []

    const offset = calculateOffset(page, limit)

    if (hasSearchAndFilter) {
      let condition = this.addQueryFilter(filter)

      if (hasPage) {
        records = await this.getRecordsWithSearch_withFilter_withPage(orderBy, condition, limit, offset, searchType, searchField, searchQuery)
      } else {
        records = await this.getRecordsWithSearch_with_filter(orderBy, condition, searchType, searchField, searchQuery)
      }
    } else if (hasSearch) {
      if (hasPage) {
        records = await this.getRecordsWithSearch_withPage(orderBy, limit, offset, searchType, searchField, searchQuery)
      } else {
        records = await this.getRecordsWithSearch(orderBy, searchType, searchField, searchQuery)
      }
    } else if (hasFilter) {
      let condition = this.addQueryFilter(filter)

      if (hasPage) {
        // console.log("here")
        records = await this.getRecordsWithFilter_withPage(orderBy, limit, offset, condition)
      } else {
        records = await this.getRecordsWithFilter(orderBy, condition)
      }
    } else {
      if (hasPage) {
        records = await this.getRecords_withPage(orderBy, limit, offset)
      } else {
        records = await this.getRecords(orderBy)
      }
    }

    return { limit, totalPages, totalRecords, recordCount: records.length, records }
  }
}

export default DrizzleBaseModelRw