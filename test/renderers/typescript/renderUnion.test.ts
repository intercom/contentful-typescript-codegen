import renderUnion, { renderUnionValues } from "../../../src/renderers/typescript/renderUnion"
import format from "../../support/format"

describe("renderUnion()", () => {
  it("renders a union", () => {
    expect(format(renderUnion("name", ["1", "2", "3"]))).toMatchInlineSnapshot(
      `"export type name = 1 | 2 | 3;"`,
    )
  })
})

describe("renderUnionValues()", () => {
  it("renders a union", () => {
    expect(renderUnionValues(["1", "2", "3"])).toMatchInlineSnapshot(`"1 | 2 | 3"`)
  })

  it("handles empty unions", () => {
    expect(renderUnionValues([])).toMatchInlineSnapshot(`"never"`)
  })
})
