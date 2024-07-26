export const findElementContainsBeginWith = ($root: JQuery, tagName: string, str: string) => {
  const $results = $root.find(`${tagName}:contains('${str}')`)
  const filteredResults = $results.filter((i, el) => {
    const text = jQuery(el).text().trim()
    return text.startsWith(str)
  })
  return filteredResults
}
