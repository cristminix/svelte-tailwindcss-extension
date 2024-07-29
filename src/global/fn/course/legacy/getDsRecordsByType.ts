import { getM3RecByType } from "@/content-scripts/inject/fn/legacy/getM3RecByType"

export function getDsRecordsByType(type: string, m3Rec: any) {
  return getM3RecByType(type, m3Rec)
}
