import type MAuthor from "@/global/db/models/MAuthor";
import type {TAuthorU} from "@/global/db/models/schema";

export async function updateAuthor(mAuthor:MAuthor,pk:number,row:TAuthorU) {
    return await mAuthor.update(pk,row)
}