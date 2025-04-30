import type MThumbnail from "@/global/db/models/MThumbnail";
import type {TThumbnailN} from "@/global/db/models/schema";

export async function insertThumbnail(mThumbnail:MThumbnail,row:TThumbnailN){
    return await mThumbnail.create(row)
}