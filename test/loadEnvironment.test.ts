import * as fs from "fs"
import { loadEnvironment } from "../src/loadEnvironment"

const contentfulEnvironment = () => ({
  getContentTypes: () => [],
  getLocales: () => [],
})

const getContentfulEnvironmentFileFactory = jest.fn((_type: string) => contentfulEnvironment)

jest.mock(
  require("path").resolve(process.cwd(), "./getContentfulEnvironment.js"),
  () => getContentfulEnvironmentFileFactory("js"),
  { virtual: true },
)

jest.mock(
  require("path").resolve(process.cwd(), "./getContentfulEnvironment.ts"),
  () => getContentfulEnvironmentFileFactory("ts"),
  { virtual: true },
)

const tsNodeRegistererEnabled = jest.fn()
const tsNodeRegister = jest.fn()

jest.mock("ts-node", () => ({ register: tsNodeRegister }))

describe("loadEnvironment", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    jest.resetModules()

    getContentfulEnvironmentFileFactory.mockReturnValue(contentfulEnvironment)
    tsNodeRegister.mockReturnValue({ enabled: tsNodeRegistererEnabled })
  })

  describe("when getContentfulEnvironment.ts exists", () => {
    beforeEach(() => {
      jest.spyOn(fs, "existsSync").mockReturnValue(true)
    })

    describe("when ts-node is not found", () => {
      beforeEach(() => {
        // technically this is throwing after the `require` call,
        // but it still tests the same code path so is fine
        tsNodeRegister.mockImplementation(() => {
          throw new (class extends Error {
            public code: string

            constructor(message?: string) {
              super(message)
              this.code = "MODULE_NOT_FOUND"
            }
          })()
        })
      })

      it("throws a nice error", async () => {
        await expect(loadEnvironment()).rejects.toThrow(
          "'ts-node' is required for TypeScript configuration files",
        )
      })
    })

    describe("when there is another error", () => {
      beforeEach(() => {
        tsNodeRegister.mockImplementation(() => {
          throw new Error("something else went wrong!")
        })
      })

      it("re-throws", async () => {
        await expect(loadEnvironment()).rejects.toThrow("something else went wrong!")
      })
    })

    describe("when called multiple times", () => {
      it("re-uses the registerer", async () => {
        await loadEnvironment()
        await loadEnvironment()

        expect(tsNodeRegister).toHaveBeenCalledTimes(1)
      })
    })

    it("requires the typescript config", async () => {
      await loadEnvironment()

      expect(getContentfulEnvironmentFileFactory).toHaveBeenCalledWith("ts")
      expect(getContentfulEnvironmentFileFactory).not.toHaveBeenCalledWith("js")
    })

    it("disables the registerer afterwards", async () => {
      await loadEnvironment()

      expect(tsNodeRegistererEnabled).toHaveBeenCalledWith(false)
    })
  })

  it("requires the javascript config", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false)

    await loadEnvironment()

    expect(getContentfulEnvironmentFileFactory).toHaveBeenCalledWith("js")
    expect(getContentfulEnvironmentFileFactory).not.toHaveBeenCalledWith("ts")
  })
})
