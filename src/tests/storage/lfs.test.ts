import "fake-indexeddb/auto"
import Fs from "@/global/classes/Fs"
describe("LFS", function () {
  it("should be able to init virtual fs", async () => {
    const fs = new Fs("fs")
    const inputFileContent = "This is a text file"
    const filename = "/data.txt"
    await fs.writeFileSync(filename, inputFileContent)

    const loadedFileContent = (await fs.readFileSync(filename)).toString()
    console.info({ loadedFileContent })
    expect(loadedFileContent).toEqual(inputFileContent)
  })
})
