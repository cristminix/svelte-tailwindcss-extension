import fs from "fs/promises"
import path from "path"

export async function writeJsonFile(filename: string, data: any) {
  const dataDir = path.join("src/tests/data")
  const fullPath = path.join(dataDir, filename)

  try {
    // const fileContent = JSON.stringify()
    await fs.writeFile(fullPath, data)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load JSON file ${fullPath}: ${error.message}`)
    }
    throw error
  }
}
