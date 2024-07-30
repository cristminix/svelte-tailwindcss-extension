import { vi } from "vitest"
import "fake-indexeddb/auto"
import MSetting from "@/global/db/models/MSetting"
const mSetting = MSetting.getInstance()

describe("MSetting", function () {
  it("should be able to set and update setting db", async () => {
    await mSetting.initOrm()
    const settingKey = "last-course-slug"
    let savedSetting = await mSetting.get(settingKey)
    console.info({ savedSetting })
    // expect(loadedFileContent).toEqual(inputFileContent)
  })
})
