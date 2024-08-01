import type { ExerciseFileInterface } from "@/global/classes/types"

export function getCourseExerciseFiles(markup: any) {
  const exerciseFiles: ExerciseFileInterface[] = []
  for (const item of markup.exerciseFiles) {
    const { sizeInBytes, url, name } = item
    const exerciseFIle: ExerciseFileInterface = {
      name,
      sizeInBytes,
      url,
    }
    exerciseFiles.push(exerciseFIle)
  }

  return exerciseFiles
}
