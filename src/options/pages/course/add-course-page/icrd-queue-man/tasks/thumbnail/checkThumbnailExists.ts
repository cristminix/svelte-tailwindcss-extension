import type MThumbnail from "@/global/db/models/MThumbnail";

export async function checkThumbnailExists(mThumbnail:MThumbnail,cuorseId:number,size:string){
    return (await mThumbnail.exists(size,cuorseId,"thumbnail",true)) as number
}