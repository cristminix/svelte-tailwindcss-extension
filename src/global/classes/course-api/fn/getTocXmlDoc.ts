export async function getTocXmlDoc(tocSlug: any, tocUrl: any, noCache = false) {
    let xmlDoc = null
  /*  if (typeof this.tocXmlDocs[tocSlug] !== "undefined" && !noCache) {
        xmlDoc = this.tocXmlDocs[tocSlug]
    }
    if (!xmlDoc) {
        const [doc, cacheKey] = await this.getXmlDoc(tocUrl, noCache, "tocXmlDocFetchStatus")
        this.lastTocXmlDocCacheKey = cacheKey
        xmlDoc = doc
        this.tocXmlDocs[tocSlug] = xmlDoc
    }
*/
    return xmlDoc
}