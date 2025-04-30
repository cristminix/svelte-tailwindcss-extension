import {AuthorSchema, type TAuthor} from "./schema"
import DrizzleDB from "./DrizzleDB"

class MAuthor extends DrizzleDB {
  schema = AuthorSchema

  async exists(slug: string,returnId = false) {
    if(returnId){
        const author:TAuthor|null = await this.getRow({ slug })
        if(author){
            return author.id
        }else{
            return 0
        }
    }
    return (await this.count({ slug })) > 0
  }
  async getBySlug(slug: string) {
    return await this.getRow({ slug })
  }
}

export default MAuthor
