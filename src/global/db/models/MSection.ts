import Fs from "@/global/classes/Fs"
import { SectionSchema } from "./schema"
// import DrizzleModelRw from "@/global/classes/DrizzleModelRw"
import DrizzleDB from "./DrizzleDB"

class MSection extends DrizzleDB {
  schema = SectionSchema

  static instance: MSection | null = null
  static getInstance() {
    if (!MSection.instance) {
      const fs = new Fs("fs")
      // check db folder

      MSection.instance = new MSection(fs)
    }
    return MSection.instance
  }

  getBySlug(slug: string, courseId: number) {
    // return this.singleQuery({ query: { slug, courseId } })
  }
  get(id: number) {
    // return this.singleQuery({ query: { id } })
  }
  getListLegacy() {
    // const results = this.db.queryAll(this.table)
    // return results
  }
  getListByCourseId(courseId: number) {
    // const results = this.query({ query: { courseId } })
    // return results
  }
  async createLegacy(title: string, slug: string, courseId: string, itemStars: string[] = []) {
    /*
    let section = this.getBySlug(slug, courseId)

    if (!section) {
      const id = 0
      const tocIds = []
      section = { id, courseId, title, slug, tocIds, itemStars }
      section.id = this.db.insert(this.table, section)
      await this.db.commit()
    } else {
      console.error(`${this.constructor.name}.create() section row exists`)
    }

    return section
    */
  }
  async updateTocIds(id: number, tocIds: number[]) {
    /*
    let section = this.get(id)
    if (section) {
      this.db.update(this.table, { id }, (row) => {
        row.tocIds = tocIds
        return row
      })

      await this.db.commit()
      section.tocIds = tocIds
    } else {
      console.error(`${this.constructor.name}.updateTocIds() toc row not exists`)
    }

    return section
    */
  }
}

export default MSection