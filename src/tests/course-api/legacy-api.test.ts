import { getDsRecordsByType } from "@/global/fn/course/legacy/getDsRecordsByType"
import { loadJsonFile } from "../loadJsonFile"
import type { TM3Rec } from "@/global/classes/types"
import { getCourseInfo } from "@/global/fn/course/legacy/parser/getCourseInfo"

describe("Legacy Api test", () => {
  it("should be able to parse legacy m3rec data", async () => {
    const dumps = {
      "project-management-foundations-15528659": "legacy-m3rec.json",
      "svelte-first-look": "legacy-m3rec-0.json",
      "building-an-application-with-svelte-and-firebase": "legacy-m3rec-1.json",
    }
    //"project-management-foundations-15528659"
    //"building-an-application-with-svelte-and-firebase"
    // cons test1 =
    const courseSlug = "project-management-foundations-15528659"
    const ds = await loadJsonFile<TM3Rec>("legacy-m3rec.json")
    // console.log(ds)
    const courseInfo = getCourseInfo(ds, courseSlug)
    if (courseInfo) {
      const { sections } = courseInfo
      console.info({ sectionStars: sections[0].itemStars })
    }
  })
})
