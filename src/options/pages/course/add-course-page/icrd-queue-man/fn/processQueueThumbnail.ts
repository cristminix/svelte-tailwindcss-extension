import type { ThumbnailInterface } from "@/global/classes/types";
import type MThumbnail from "@/global/db/models/MThumbnail";
import type { TThumbnail } from "@/global/db/models/schema";
import { checkThumbnailExists, insertThumbnail, updateThumbnail } from "../tasks/thumbnail";
export type TProcessQueueThumbnailResult = {
    thumbnails:TThumbnail[]
}
export async function processQueueThumbnail(mThumbnail:MThumbnail,thumbnails:ThumbnailInterface[],courseId:number){
    const results:TProcessQueueThumbnailResult = {
        thumbnails:[]
    }
    for (const thumbnail of thumbnails) {
        const {size,url,expiresAt} = thumbnail
        const thumbId = await checkThumbnailExists(mThumbnail,courseId,size)
        const row = {url,size,expiresAt:expiresAt.toString(),parentId:courseId,kind:"course"}
        let thumbnailRec:TThumbnail
        if (thumbId) {
            thumbnailRec=await updateThumbnail(mThumbnail,thumbId,row)
        } else {
            thumbnailRec=await insertThumbnail(mThumbnail,row)
        }
        results.thumbnails.push(thumbnailRec)
    }
    return results
}