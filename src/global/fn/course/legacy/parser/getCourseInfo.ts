import type { CourseInfoInterface, TM3Rec } from "@/global/classes/types"
import { getDsRecordsByType } from "../getDsRecordsByType"
import { getCourseTitle } from "./course/getCourseTItle"
import { getCourseDuration } from "./course/getCourseDuration"
import { getCourseSourceCodeRepository } from "./course/getCourseSourceCodeRepository"
import { getCourseUrn } from "./course/getCourseUrn"
import { getCourseGithubCodespace } from "./course/getCourseGithubCodespace"
import { getCourseExerciseFiles } from "./course/getCourseExerciseFiles"
import { getCourseSubtitle } from "./course/getCourseSubtitle"
import { getCourseDescription } from "./course/getCourseDescription"
import { getCourseAuthor } from "./course/getCourseAuthor"
import { getCourseAuthors } from "./course/getCourseAuthors"
import { getCourseSections } from "./course/getCourseSections"

export function getCourseInfo(ds: TM3Rec, slug: string): CourseInfoInterface | null {
  const rows = getDsRecordsByType("com.linkedin.learning.api.deco.content.Course", ds)
  let markup: any
  let courseInfo: CourseInfoInterface | null = null

  const filteredRow = rows.find((row) => row?.slug === slug)
  if (filteredRow) {
    markup = filteredRow
  }

  if (markup) {
    const title = getCourseTitle(markup)
    const duration = getCourseDuration(markup)
    const sourceCodeRepository = getCourseSourceCodeRepository(markup)
    const subtitle = getCourseSubtitle(markup)
    const entityUrn = getCourseUrn(markup)
    const githubCodespace = getCourseGithubCodespace(markup)
    const exerciseFiles = getCourseExerciseFiles(markup)
    const description = getCourseDescription(markup)
    const authors = getCourseAuthors(ds)
    const sections = getCourseSections(ds, entityUrn)
    // console.log({ authors, exerciseFiles, sections })
    courseInfo = {
      title,
      duration,
      sourceCodeRepository,
      subtitle,
      slug,
      urn: entityUrn,
      githubCodespace,
      exerciseFiles,
      description,
      authors,
      sections,
    }
  }
  return courseInfo
}
