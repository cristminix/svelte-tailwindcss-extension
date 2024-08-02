import { AuthorSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MAuthor extends DrizzleDB {
  schema = AuthorSchema

  async exists(slug: string) {
    return (await this.count({ slug })) > 0
  }
  async getBySlug(slug: string) {
    return await this.getRow({ slug })
  }
}

export default MAuthor
