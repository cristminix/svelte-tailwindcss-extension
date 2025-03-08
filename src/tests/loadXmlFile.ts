import fs from "fs/promises"
import path from "path"

export async function loadXmlFile(inputPath: string): Promise<string> {
  const dataDir = path.join("src/tests/data")
  const fullPath = path.join(dataDir, inputPath)
  let fileContent:string|null = null
  try {
    fileContent = await fs.readFile(fullPath, "utf-8")
    return fileContent

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load XML file ${fullPath}: ${error.message}`)
    }
    throw error
  }
}
