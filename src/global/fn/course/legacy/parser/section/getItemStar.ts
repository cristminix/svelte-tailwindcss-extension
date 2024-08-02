export function getItemStar(markup: any) {
  if (markup["*items"]) {
    return markup["*items"]
  }
  const itemStars: string[] = []
  // content v2
  if (markup.items) {
    const markupItems = markup.items
    // console.log({ markupItems })
    for (const markupItem of markupItems) {
      if (markupItem.contentV2) {
        const content = markupItem.contentV2
        if (content["*video"]) {
          itemStars.push(content["*video"])
        }
      }
    }
  }
  return itemStars
}
