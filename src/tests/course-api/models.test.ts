import "fake-indexeddb/auto"

import { loadJsonFile } from "../loadJsonFile"
import type { CourseInfoInterface, TM3Rec } from "@/global/classes/types"
import type { TCourse, TCourseN, TSection, TSectionN, TThumbnail, TThumbnailN, TTocN } from "@/global/db/models/schema"
import { getCourseInfo } from "@/global/fn/course/legacy/parser/getCourseInfo"
import { getCourseTocs } from "@/global/fn/course/legacy/parser/toc/getCourseTocs"
import { SqlDB } from "@/global/classes/SqlDB"
import DBStore from "@/global/db/DBStore"
import type MSetting from "@/global/db/models/MSetting"
import type MCourse from "@/global/db/models/MCourse"
import { createCourse } from "@/global/fn/course-api/course/createCourse"
import type MSection from "@/global/db/models/MSection"
import { createSection } from "@/global/fn/course-api/section/createSection"
import { createToc } from "@/global/fn/course-api/toc/createToc"
import type MToc from "@/global/db/models/MToc"
import type MThumbnail from "@/global/db/models/MThumbnail"
import { createThumbnail } from "@/global/fn/course-api/thumbnail/createThumbnail"
import { isTimeExpired } from "@/global/fn/course/isTimeExpired"
const sqldb = new SqlDB()
const dbStore = DBStore.getInstance()
describe("Legacy Model test", async () => {
  it("should be able to insert, create course sqlite data with drizzle orm", async () => {
    const dumps: any = {
      "project-management-foundations-15528659": "legacy-m3rec.json",
      "svelte-first-look": "legacy-m3rec-0.json",
      "building-an-application-with-svelte-and-firebase": "legacy-m3rec-1.json",
    }
    /*----------------------------------------------------------------------------------*/
    /* load legacy api course mock data */
    /*----------------------------------------------------------------------------------*/
    const slugKeys = Object.keys(dumps)
    const courseSlug = slugKeys[2]
    const ds = await loadJsonFile<TM3Rec>(dumps[courseSlug])
    // console.log(ds)
    const courseInfo: CourseInfoInterface | null = getCourseInfo(ds, courseSlug)
    /*----------------------------------------------------------------------------------*/
    /* init models */
    /*----------------------------------------------------------------------------------*/
    await sqldb.init().then(() => dbStore.setSqlDb(sqldb))

    const mCourse = dbStore.get<MCourse>("Course")
    const mSection = dbStore.get<MSection>("Section")
    const mToc = dbStore.get<MToc>("Toc")
    const mThumbnail = dbStore.get<MThumbnail>("Thumbnail")
    const modelLoaded = mCourse && mSection && mToc && mThumbnail
    if (!modelLoaded) {
      console.error(`Failed to initialize models`)
      return
    }

    if (courseInfo) {
      /*----------------------------------------------------------------------------------*/
      /* create course */
      /*----------------------------------------------------------------------------------*/
      const { title, slug, duration, sourceCodeRepository, description, urn, timestamp } = courseInfo
      const courseRow: TCourseN = {
        title,
        slug,
        duration,
        sourceCodeRepository,
        description,
        urn,
        timestamp: timestamp as string,
      }

      let courseRec = await createCourse(courseRow, mCourse)
      if (!courseRec) {
        console.error(`cant create course record`)
        return
      }
      let sectionRecs: TSection[] = []
      if (courseRec) {
        /*----------------------------------------------------------------------------------*/
        /* create sections */
        /*----------------------------------------------------------------------------------*/
        const { sections: sectionRows } = courseInfo
        for (const section of sectionRows) {
          const { title, slug, itemStars } = section
          const courseId = courseRec.id
          const sectionRow: TSectionN = {
            courseId,
            title,
            slug,
          }
          let sectionRec = await createSection(sectionRow, mSection)
          if (sectionRec) {
            /*----------------------------------------------------------------------------------*/
            /* create toc */
            /*----------------------------------------------------------------------------------*/
            const tocRows = getCourseTocs(ds, itemStars)
            for (const toc of tocRows) {
              const sectionId = sectionRec.id
              const { title, slug } = toc
              const tocRow: TTocN = {
                title,
                slug,
                sectionId,
              }
              let tocRec = await createToc(tocRow, mToc)
              if (tocRec) {
                /*----------------------------------------------------------------------------------*/
                /* create toc thumbnail*/
                /*----------------------------------------------------------------------------------*/
                for (const thumbnail of toc.thumbnails) {
                  const { size, url, expiresAt } = thumbnail
                  const tocId = tocRec.id as number
                  const kind = "toc"
                  const thumbnailRow: TThumbnailN = {
                    size,
                    url,
                    expiresAt: expiresAt.toString(),
                    kind,
                    parentId: tocId,
                  }
                  let thumbnailRec: TThumbnail | null = null
                  if (!isTimeExpired(expiresAt)) {
                    thumbnailRec = await createThumbnail(thumbnailRow, mThumbnail)
                  } else {
                    console.error(`not insert thumbnail becouse expired`)
                  }
                }
              }
            }
            /*----------------------------------------------------------------------------------*/
            /* create tocSection not necessary since toc already have sectionId many <-- to one */
            /*----------------------------------------------------------------------------------*/
          }
          console.info({ sectionRec })
        }
      }

      console.info({ courseRec })

      /*----------------------------------------------------------------------------------*/
      /* create course author */
      /*----------------------------------------------------------------------------------*/

      /*----------------------------------------------------------------------------------*/
      /* create course thumbnail */
      /*----------------------------------------------------------------------------------*/
      const { thumbnails } = courseInfo
      for (const thumbnail of thumbnails) {
        const { size, url, expiresAt } = thumbnail
        const tocId = courseRec.id as number
        const kind = "course"
        const thumbnailRow: TThumbnailN = {
          size,
          url,
          expiresAt: expiresAt.toString(),
          kind,
          parentId: tocId,
        }
        let thumbnailRec: TThumbnail | null = null
        if (!isTimeExpired(expiresAt)) {
          thumbnailRec = await createThumbnail(thumbnailRow, mThumbnail)
        } else {
          console.error(`not insert thumbnail becouse expired`)
        }
      }
    }
  })
})
