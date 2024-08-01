import { getDsRecordsByType } from "@/global/fn/course/legacy/getDsRecordsByType"
import { loadJsonFile } from "../loadJsonFile"

describe("Legacy Api test", () => {
  it("should be able to parse legacy m3rec data", async () => {
    const courseSlug = "svelte-first-look"
    const ds = await loadJsonFile("legacy-m3rec.json")
    // console.log(m3Rec)
    const rows = getDsRecordsByType("com.linkedin.learning.api.deco.content.Course", ds)
    if (rows.length > 0) {
      const filteredRows = rows.filter((row) => {
        if (row) {
          if (row.slug) {
            return row.slug == courseSlug
          }
        }
      })
      if (filteredRows.length > 0) {
        const row = filteredRows.pop()
        console.log({ row })
        const { title, duration, sourceCodeRepository, subtitle, slug, entityUrn, githubCodespace, exerciseFiles } = row
      }
    }
    console.info({ rows })
  })
})
