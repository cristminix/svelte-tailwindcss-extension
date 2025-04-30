import type MAuthor from "@/global/db/models/MAuthor";
import type {TAuthorN} from "@/global/db/models/schema";

export async function insertAuthor(mAuthor:MAuthor,row:TAuthorN) {
    return await mAuthor.create(row)
}