import { SqlDB } from "@/global/classes/SqlDB"
import DBStore from "@/global/db/DBStore"
import type MSetting from "@/global/db/models/MSetting"
const sqldb = new SqlDB()
const dbStore = DBStore.getInstance()

describe("MSetting", function () {
  it("should be able to set and update setting db", async () => {
    await sqldb.init()
    dbStore.setSqlDb(sqldb)
    const mSetting = dbStore.get("Setting") as MSetting
    const settingKey = "last-course-slug"
    let savedSetting = await mSetting.get(settingKey)
    console.info({ savedSetting })
    const newValue = "new-value"
    await mSetting.set(settingKey, newValue)
    savedSetting = await mSetting.get(settingKey)
    console.info({ savedSetting })

    expect(savedSetting).toEqual(newValue)
  })
})
