import { getDsRecordsByType } from "@/global/fn/course/legacy/getDsRecordsByType"
import { loadJsonFile } from "../loadJsonFile"
import type { TM3Rec } from "@/global/classes/types"
import { getCourseInfo } from "@/global/fn/course/legacy/parser/getCourseInfo"

describe("Legacy Api test", () => {
  it("should be able to parse legacy m3rec data", async () => {
    const courseSlug = "project-management-foundations-15528659" //"building-an-application-with-svelte-and-firebase" //"svelte-first-look"
    const ds = await loadJsonFile<TM3Rec>("legacy-m3rec.json")
    // console.log(ds)
    const courseInfo = getCourseInfo(ds, courseSlug)

    console.info({ courseInfo })
  })
})
