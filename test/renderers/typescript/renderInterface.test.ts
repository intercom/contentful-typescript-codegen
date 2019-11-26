import renderInterface from "../../../src/renderers/typescript/renderInterface"
import format from "../../support/format"

describe("renderInterface()", () => {
  it("works", () => {
    expect(format(renderInterface({ name: "IFoo", fields: "field: string" })))
      .toMatchInlineSnapshot(`
      "export interface IFoo {
        field: string;
      }"
    `)
  })

  it("adds comments to interfaces", () => {
    expect(
      format(
        renderInterface({
          name: "IFoo",
          fields: "field: string",
          description: "Example interface",
        }),
      ),
    ).toMatchInlineSnapshot(`
      "/** Example interface */
      export interface IFoo {
        field: string;
      }"
    `)
  })
})
