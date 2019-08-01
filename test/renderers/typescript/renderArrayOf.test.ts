import renderArrayOf from "../../../src/renderers/typescript/renderArrayOf"

describe("renderArrayOf()", () => {
  it("renders array types safely", () => {
    expect(renderArrayOf("thing")).toMatchInlineSnapshot(`"(thing)[]"`)
  })
})
