import "fake-indexeddb/auto"
import { loadXmlFile } from "@/tests/loadXmlFile";
import type {CourseInfoInterface, SectionInterface, TM3Rec, TocInterface} from "@/global/classes/types"
import type { TAuthor, TAuthorCourseN, TAuthorN, TCourse, TCourseN, TSection, TSectionN, TThumbnail, TThumbnailN, TTocN } from "@/global/db/models/schema"
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
import type MAuthor from "@/global/db/models/MAuthor"
import { createCourseAuthor } from "@/global/fn/course-api/author/createCourseAuthor"
import { createAuthorCourse } from "@/global/fn/course-api/author/createAuthorCourse"
import type MAuthorCourse from "@/global/db/models/MAuthorCourse"
import {getCourseInfoFromDoc} from "@/global/classes/course-api/fn/getCourseInfoFromDoc";
import jQuery from "jquery";
import {getCourseSectionsFromDoc} from "@/global/classes/course-api/fn/getCourseSectionsFromDoc";
import {getCourseAuthorsFromDoc} from "@/global/classes/course-api/fn/getCourseAuthorsFromDoc";
import {getCourseSectionTocsFromDoc} from "@/global/classes/course-api/fn";
const sqldb = new SqlDB()
const dbStore = DBStore.getInstance()
describe("Xml Doc parser test", async () => {
    it("should be able to insert, create course sqlite data with drizzle orm from xml document", async () => {
        /*----------------------------------------------------------------------------------*/
        /* init models */
        /*----------------------------------------------------------------------------------*/
        await sqldb.init().then(() => dbStore.setSqlDb(sqldb))

        const mCourse = dbStore.get<MCourse>("Course")
        const mSection = dbStore.get<MSection>("Section")
        const mToc = dbStore.get<MToc>("Toc")
        const mThumbnail = dbStore.get<MThumbnail>("Thumbnail")
        const mAuthor = dbStore.get<MAuthor>("Author")
        const mAuthorCourse = dbStore.get<MAuthorCourse>("AuthorCourse")
        const modelLoaded = mCourse && mSection && mToc && mThumbnail && mAuthor && mAuthorCourse
        if (!modelLoaded) {
            throw new Error(`Failed to initialize models`)
        }
        const slug = "cloud-native-development-with-node-js-docker-and-kubernetes"
        const xmlFilePath = `${slug}.xml`
        const xmlContent = await loadXmlFile(xmlFilePath)
        // console.log(cheerio)

        const doc = jQuery(xmlContent)
        const courseInfo = getCourseInfoFromDoc(doc, slug)
        const courseAuthors = getCourseAuthorsFromDoc(doc)
        const courseSections:SectionInterface[] = getCourseSectionsFromDoc(doc)
        const secsTocs:any = {}
        for (const section of courseSections) {
            const tocs = getCourseSectionTocsFromDoc(section,doc,slug)
            secsTocs[section.slug] = tocs
        }
        // test first toc
        const toc:TocInterface = secsTocs[courseSections[0].slug as keyof typeof secsTocs ][0]
        console.log(courseInfo,courseSections,courseAuthors,secsTocs,{toc})

        //
        const tocSlug = toc.slug //"the-power-of-cloud-native"
        const tocXmlFilePath = `${tocSlug}.xml`

        const tocDoc = await loadXmlFile(tocXmlFilePath)
        console.log({tocDoc})
    })
})