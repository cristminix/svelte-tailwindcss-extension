import MCourse from "@/global/db/models/MCourse"
import MSection from "@/global/db/models/MSection"
import MToc from "@/global/db/models/MToc"
import { courseUrlFromSlug } from "@/global/fn/course/courseUrlFromSlug"
import { slugify } from "@/global/fn/course/slugify"

const mCourse = MCourse.getInstance()
const mSection = MSection.getInstance()
const mToc = MToc.getInstance()

async function insertCourseLegacy(course: any, sections: any, callback: () => void) {
  if (course) {
    // create Course
    const { title, slug, duration, sourceCodeRepository, description, urn } = course
    const courseRec = await mCourse.create(title, slug, duration, sourceCodeRepository, description, urn)
    if (courseRec) {
      console.log(courseRec)
      // create Section
      const courseId = courseRec.id
      if (Array.isArray(sections)) {
        for (const section of sections) {
          const itemStars = []
          const sectionSlug = slugify(section.title)
          const sectionRec = await mSection.create(section.title, sectionSlug, courseId, itemStars)
          if (sectionRec) {
            console.log(sectionRec)
            if (Array.isArray(section.items)) {
              for (const toc of section.items) {
                const sectionId = sectionRec.id
                const itemStar = null
                const vStatusUrn = null
                const tocUrl = courseUrlFromSlug(`${course.slug}/${toc.slug}`)
                const tocRec = await mToc.create(toc.title, toc.slug, tocUrl, toc.duration, null, null, sectionId, itemStar, vStatusUrn)
                if (tocRec) {
                  console.log(tocRec)
                } else {
                  console.error("failed to create toc")
                }
              }
            }
          } else {
            console.error("failed to create section")
          }
        }
      }
    } else {
      console.error("failed to create course")
    }
  }
}
