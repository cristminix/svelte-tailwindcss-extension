import type MExerciseFile from "@/global/db/models/MExerciseFile";
import type {TExerciseFileN} from "@/global/db/models/schema";

async function insertExFile(mExFile:MExerciseFile,row:TExerciseFileN){
    return await mExFile.create(row)
}