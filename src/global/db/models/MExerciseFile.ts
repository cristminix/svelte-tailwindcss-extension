import { ExerciseFileSchema } from "./schema"
import DrizzleDB from "./DrizzleDB"

class MExerciseFile extends DrizzleDB {
  schema = ExerciseFileSchema

  getByNameAndCourseId(name: string, courseId: number) {
    // return this.singleQuery({query: {name,courseId}})
  }
  getListByCourseId(courseId: number) {
    // return this.query({query:{courseId}})
  }
  async createLegacy(name: string, url: string, size: number, courseId: number) {
    /*
    let exerciseFile = this.getByNameAndCourseId(name,courseId)

    if(!exerciseFile){
        const id = 0
        exerciseFile = {id,courseId,name,url,size}
        exerciseFile.id = this.db.insert(this.table,exerciseFile)

    }else{
        console.log(exerciseFile.url, url)
        const id = exerciseFile.id
        exerciseFile.url = url
        this.db.update(this.table,{id}, row => {
            row.url = url
            return row
        })
        console.log(`Exercise file updated`)
    }
    await this.db.commit()

    return exerciseFile
    */
  }
}

export default MExerciseFile
