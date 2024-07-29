import Fs from "@/global/classes/Fs"
import { ThumbnailSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MThumbnail extends DrizzleDB {
  schema = ThumbnailSchema

  static instance: MThumbnail | null = null
  static getInstance() {
    if (!MThumbnail.instance) {
      const fs = new Fs("fs")
      // check db folder

      MThumbnail.instance = new MThumbnail(fs)
    }
    return MThumbnail.instance
  }

  async deleteByCourseId(courseId: number) {
    // await this.deleteRows({ courseId })
  }

  getListByCourseId(courseId: number) {
    // return this.query({ query: { courseId } })
  }
  getListByCourseIdAsObject(courseId: number) {
    /*
    const results = this.getListByCourseId(courseId)
    let thumbs = null
    if (results.length > 0) {
      thumbs = {}
      for (const row of results) {
        thumbs[row.size] = row
      }
    }
    return thumbs
    */
  }
  getBySizeAndCourseId(size: number, courseId: number) {
    // return this.singleQuery({ query: { courseId, size } })
  }
  getById(id: number) {
    // return this.singleQuery({ query: { id } })
  }
  async createLegacy(courseId: number, size: number, url: string, expiresAt: number | null) {
    /*
    let row = this.getBySizeAndCourseId(size, courseId)
    if (!row) {
      const id = 0
      row = { courseId, size, url, expiresAt }
      row.id = this.db.insert(this.table, row)
      await this.db.commit()
    } else {
      await this.update(row.id, { size, url, expiresAt })
      // console.error(`${this.constructor.name}.create() toc row exists`)
    }

    return row
    */
  }
  async updateLegacy(id: number, row_: any) {
    /*
    let record = this.getById(id)
    if (record) {
      this.db.update(this.table, { id }, (row) => {
        for (let k in row_) {
          row[k] = row_[k]
          record[k] = row_[k]
        }
        return row
      })
      await this.db.commit()
    }

    return record
    */
  }
}

export default MThumbnail
