import type {StreamLocationInterface} from "@/global/classes/types";
import jQuery from "jquery";
export function getStreamLocationsFromDoc(toc:any,doc: any,vMetaDataNd:any){
    let streamLocations:any|null = null//mStreamLocation.getListByTocId(toc.id)
    // let vMetaDataNd:any|null = null
    let pgStreamNds:any[] = []
    if(Array.isArray(streamLocations)){
        if (vMetaDataNd) {
            pgStreamNds = vMetaDataNd.find("progressiveStreams")
        }

    }


    // let streamLocations = null
    const tags:string[] = ["size", "bitRate", "width", "height"]

    if(Array.isArray(pgStreamNds)){
    if (pgStreamNds.length > 0) {
        for (const pgStreamElem of pgStreamNds) {
            const pgStreamEl = jQuery(pgStreamElem)
            let fmt : any = pgStreamEl.find("height")

            if (fmt.length>0) {
                fmt = fmt.text().trim()

                if (fmt === "0") {
                    fmt = "audio"
                }

                if (!streamLocations) {
                    streamLocations = {}
                }

                streamLocations[fmt] = {}
                const streamLoc = pgStreamEl.find("streamingLocations")

                if (streamLoc.length>0) {
                    const url : JQuery<HTMLElement> = streamLoc.find("url")

                    if (url.length>0) {
                        streamLocations[fmt].url = url.text().trim()
                    }

                    const expiresAt: JQuery<HTMLElement> = streamLoc.find("expiresAt")

                    if (expiresAt.length>0) {
                        streamLocations[fmt].expiresAt = parseInt(expiresAt.text().trim()) / 1000
                    }

                    for (const tag of tags) {
                        const tagNd = streamLoc.find(tag)

                        if (tagNd.length>0) {
                            streamLocations[fmt][tag] = parseInt(tagNd.text().trim())
                        }
                    }

                    const sLoc:StreamLocationInterface = {
                        fmt,
                        url: streamLocations[fmt].url,
                        expiresAt: streamLocations[fmt].expiresAt
                    }
                        //const row = await mStreamLocation.create(fmt, sLoc.url, toc.id, sLoc.expiresAt)
                    streamLocations[fmt]=sLoc
                }
            }
        }
    }
    }
    return streamLocations
}