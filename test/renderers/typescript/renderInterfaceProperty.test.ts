import renderInterfaceProperty from "../../../src/renderers/typescript/renderInterfaceProperty"

describe("renderInterfaceProperty()", () => {
  it("works with unrequired properties", () => {
    expect(renderInterfaceProperty("property", "type", false).trim()).toMatchInlineSnapshot(
      `"property: type | null;"`,
    )
  })

  it("works with required properties", () => {
    expect(renderInterfaceProperty("property", "type", false).trim()).toMatchInlineSnapshot(
      `"property: type | null;"`,
    )
  })

  it("adds descriptions", () => {
    expect(renderInterfaceProperty("property", "type", false, "Description").trim())
      .toMatchInlineSnapshot(`
"/** Description */
 property: type | null;"
`)
  })
})
