import "fake-indexeddb/auto"
import * as idb from "idb-keyval"
describe("IndexedDB key value store", function () {
  it("should be able to set and get a value", async () => {
    const data = {
      id: 1,
      username: "cristminix",
      displayName: "Putra Budiman",
    }
    const key = "test-key"
    await idb.set(key, data)

    const loadedData = await idb.get(key)
    console.info({ loadedData })
    expect(loadedData).toEqual(data)
  })
})
