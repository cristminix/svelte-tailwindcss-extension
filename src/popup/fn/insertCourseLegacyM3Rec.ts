import PrxCache from "@/global/classes/PrxCache"

const mPrxCache = PrxCache.getInstance()
export async function insertCourseLegacyM3Rec(slug: string, m3Rec: any, callback: (slug: string, success: boolean) => void) {
  await mPrxCache.set(slug, m3Rec, 200)
  callback(slug, true)
}
