import { findPropLegacy as findProp } from "@/content-scripts/inject/fn/legacy/findProp"

export function getCourseThumbnails(markup: any) {
  let thumbnails: any[] = []

  if (markup.primaryThumbnail) {
    const rootUrl = findProp("rootUrl", markup.primaryThumbnail, true)
    const artifacts = findProp("artifacts", markup.primaryThumbnail, true)
    if (Array.isArray(artifacts)) {
      for (const artifact of artifacts) {
        const size = `${artifact.width}x${artifact.height}`
        const url = `${rootUrl}${artifact.fileIdentifyingUrlPathSegment}`
        const { expiresAt } = artifact

        const thumbnail = { size, url, expiresAt }
        thumbnails.push(thumbnail)
      }
    }
  } else if (markup.primaryThumbnailV2) {
    const rootUrl = findProp("rootUrl", markup.primaryThumbnailV2, true)
    const artifacts = findProp("artifacts", markup.primaryThumbnailV2, true)

    if (Array.isArray(artifacts)) {
      for (const artifact of artifacts) {
        const size = `${artifact.width}x${artifact.height}`
        const url = `${rootUrl}${artifact.fileIdentifyingUrlPathSegment}`
        const { expiresAt } = artifact

        const thumbnail = { size, url, expiresAt }
        thumbnails.push(thumbnail)
      }
    }
  }
}
