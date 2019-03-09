import renderInterface from "../../../src/renderers/typescript/renderInterface"
import format from "../../support/format"

describe("renderInterface()", () => {
  it("works", () => {
    expect(format(renderInterface("IFoo", "field: string"))).toMatchInlineSnapshot(`
"interface IFooFields {
  field: string;
}

export interface IFoo extends Entry<IFooFields> {}"
`)
  })

  it("adds comments to interfaces", () => {
    expect(format(renderInterface("IFoo", "field: string", "Example interface")))
      .toMatchInlineSnapshot(`
"interface IFooFields {
  field: string;
}

/**
 * Example interface
 */
export interface IFoo extends Entry<IFooFields> {}"
`)
  })
})
