export function getCourseDuration(markup: any) {
  if (markup.duration) {
    return markup.duration.duration
  }
  return 0
}
