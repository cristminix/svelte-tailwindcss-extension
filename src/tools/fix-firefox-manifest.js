import manifest from "../manifest.json" assert { type: "json" }
import fs from "node:fs"
async function writeManifest(manifest) {
  const distManifestPath = "dist/manifest.json"
  let manifestContent = JSON.parse((await fs.readFileSync(distManifestPath)).toString())
  console.log(`Fix firefox permissions`)
  const permissions = ["tabs", "activeTab", "storage", "http://localhost/*", "https://www.linkedin.com/*"]

  manifestContent.permissions = permissions
  await fs.writeFileSync(distManifestPath, JSON.stringify(manifestContent, null, 2))
  //   console.log({ permissions, manifestContent })
}

async function main() {
  //   console.log({ manifest })
  await writeManifest(manifest)
}

main()
