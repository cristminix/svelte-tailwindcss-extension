import fs from "fs/promises"
import path from "path"

export async function loadJsonFile<T>(inputPath: string): Promise<T> {
  const dataDir = path.join("src/tests/data")
  const fullPath = path.join(dataDir, inputPath)

  try {
    const fileContent = await fs.readFile(fullPath, "utf-8")
    return JSON.parse(fileContent) as T
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load JSON file ${fullPath}: ${error.message}`)
    }
    throw error
  }
}
