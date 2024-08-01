import * as idb from "idb-keyval"
import type { OptionalParams } from "../components/grid/types"
import { slugify } from "../fn/course/slugify"
const WEBCACHE_PREFIX = "WebCache_"

export class WebCache {
  key: string | null = null
  content: any | OptionalParams = null
  statusCode = 0
  url: string | null = null

  constructor(url: string) {
    this.setUrl(url)
  }
  setUrl(url: string) {
    this.url = url
    if (url) {
      this.key = `${WEBCACHE_PREFIX}${slugify(url)}`
    }
  }
  static async fromKey(key: string) {
    const data = await idb.get(key)
    return data
  }
  setContent(content: string) {
    this.content = content
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode
  }

  async save() {
    const { content, statusCode, url } = this
    const record = { statusCode, url, content }
    return await idb.set(this.getKey(), record)
  }

  async delete() {
    return await idb.del(this.getKey())
  }

  getKey() {
    return this.key as IDBValidKey
  }

  async remove() {
    await this.delete()
  }

  async load() {
    const key = this.getKey()
    const data = await idb.get(key)
    if (data) {
      if (data.content) {
        this.content = data.content
        this.statusCode = data.statusCode
      }
    }
  }
  getCacheContent() {
    return this.content
  }
  getStatusCode() {
    return this.statusCode
  }
  isEmpty() {
    const empty = this.content === null || typeof this.content == "undefined"
    console.log(`Empty:`, empty)
    return empty
  }
}

class PrxCache {
  //   table = "PrxCache"
  static instance: PrxCache | null = null
  static getInstance() {
    if (!PrxCache.instance) {
      PrxCache.instance = new PrxCache()
    }
    return PrxCache.instance
  }
  async clearAll() {
    console.log(`PrxCache.clearAll():method not implemented`)
  }
  async get(url: string, noCache = false) {
    const webCache = new WebCache(url)
    if (noCache) {
      await webCache.delete()
      console.log(`PrxCache.get(${url},noCache=${noCache ? "1" : "0"})`)
    } else {
      await webCache.load()
    }
    return webCache
  }
  async getByKey(key: string) {
    const webCache = await WebCache.fromKey(key)
    return webCache
  }
  async set(url: string, content: string, statusCode: number) {
    const webCache = new WebCache(url)
    webCache.setContent(content)
    webCache.setStatusCode(statusCode)
    await webCache.save()
    return webCache
  }

  async unset(url: string) {
    const webCache = await this.get(url)
    if (!webCache.isEmpty()) {
      webCache.remove()
    }
  }
  async unsetByKey(key: string) {
    const webCache = await this.getByKey(key)
    if (webCache) {
      if (!webCache.isEmpty()) {
        webCache.remove()
      }
    }
  }
  async getCounts() {
    console.log(`PrxCache.getCounts():method not implemented`)
    return 0
  }
  async getSize() {
    console.log(`PrxCache.getSize():method not implemented`)

    return 0
  }
}
export default PrxCache
