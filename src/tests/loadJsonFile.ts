import fs from "node:fs"
import path from "node:path"

export async function loadJsonFile(inputPath: string) {
  const dataDir = path.join("src/tests/data")
  const fullPath = path.join(dataDir, inputPath)
  let obj: any = {}
  if (await fs.existsSync(fullPath)) {
    const fileContent = (await fs.readFileSync(fullPath)).toString()
    try {
      obj = JSON.parse(fileContent)
    } catch (error) {}
  } else {
    console.error(`JSON file doesnt exists : ${fullPath}`)
  }
  return obj
}
