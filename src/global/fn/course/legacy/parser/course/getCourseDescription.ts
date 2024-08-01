export function getCourseDescription(markup: any) {
  if (markup.descriptionV3) {
    return markup.descriptionV3.text
  }
  if (markup.descriptionV2) {
    return markup.descriptionV2.text
  }
  if (markup.description) {
    return markup.description.text
  }
}
