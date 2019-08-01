import renderInterfaceProperty from "../../../src/renderers/typescript/renderInterfaceProperty"

describe("renderInterfaceProperty()", () => {
  it("works with unrequired properties", () => {
    expect(renderInterfaceProperty("property", "type", false).trim()).toMatchInlineSnapshot(
      `"property?: type | undefined;"`,
    )
  })

  it("works with required properties", () => {
    expect(renderInterfaceProperty("property", "type", true).trim()).toMatchInlineSnapshot(
      `"property: type;"`,
    )
  })

  it("adds descriptions", () => {
    expect(renderInterfaceProperty("property", "type", false, "Description").trim())
      .toMatchInlineSnapshot(`
"/** Description */
property?: type | undefined;"
`)
  })
})
