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
})
