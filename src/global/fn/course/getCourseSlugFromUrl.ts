import { isLinkedinLearningUrl } from "./isLinkedinLearningUrl"
import { isValidUrl } from "./isValidUrl"

export const getCourseSlugFromUrl = (url: string) => {
  if (!isValidUrl(url)) {
    return [false, false]
  }
  if (!isLinkedinLearningUrl(url)) {
    return [false, false]
  }
  const slugs = url.replace("https://www.linkedin.com/learning/", "").split("/")
  const courseSlug = slugs[0]
  let tocSlug: string = ""
  if (slugs.length > 1) {
    tocSlug = slugs[1]
    return [courseSlug, tocSlug]
  }

  return [false, false]
}
