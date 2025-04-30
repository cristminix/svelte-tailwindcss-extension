import type MSection from "@/global/db/models/MSection";
import type {TSectionN} from "@/global/db/models/schema";

export async function insertSection(mSection:MSection,courseId:number,row:TSectionN){
    return await mSection.create(row)
}