import { TocSchema } from "./schema"
// import DrizzleModelRw from "@/global/classes/DrizzleModelRw"
import DrizzleDB from "./DrizzleDB"

class MToc extends DrizzleDB {
  schema = TocSchema

  getListBySectionId(sectionId: number) {
    // return this.query({ query: { sectionId } })
  }
  getBySlug(slug: string, sectionId: number) {
    // return this.singleQuery({ query: { slug, sectionId } })
  }
  get(id: string) {
    // return this.singleQuery({ query: { id } })
  }
  getByItemStar(itemStar: string) {
    // return this.singleQuery({ query: { itemStar } })
  }
  async updateLegacy(id: number, tocUrl: string, captionUrl: string, captionFmt: string, streamlocIds: number[]) {
    /*
    const toc = this.get(id)
    if (toc) {
      this.db.update(this.table, { id }, (row) => {
        row.captionUrl = captionUrl
        row.captionFmt = captionFmt
        row.streamLocationIds = streamlocIds
        row.url = tocUrl
        return row
      })
      toc.streamLocationIds = streamlocIds
      await this.db.commit()
    } else {
      console.warn(`${this.constructor.name}.update() row is not exists`)
    }
    return toc
    */
  }

  async createLegacy(title: string, slug: string, url: string, duration: number, captionUrl: string, captionFmt: string, sectionId: number, itemStar: string, vStatusUrn: string) {
    /*
    let toc = this.getBySlug(slug, sectionId)

    if (!toc) {
      const id = 0
      const streamLocationIds = []
      toc = { id, sectionId, title, slug, url, duration, captionUrl, captionFmt, streamLocationIds, itemStar, vStatusUrn }
      toc.id = this.db.insert("toc", toc)
      await this.db.commit()
    } else {
      console.error(`${this.constructor.name}.create() toc row exists`)
    }

    return toc
  */
  }
}

export default MToc
