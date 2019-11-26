import renderInterface from "../../../src/renderers/typescript/renderInterface"
import format from "../../support/format"

describe("renderInterface()", () => {
  it("works", () => {
    expect(format(renderInterface("foo", "IFoo", "field: string"))).toMatchInlineSnapshot(`
      "export interface IFooFields {
        field: string;
      }

      export interface IFoo extends PatchedEntry<IFooFields, \\"foo\\"> {}"
    `)
  })

  it("adds comments to interfaces", () => {
    expect(format(renderInterface("foo", "IFoo", "field: string", "Example interface")))
      .toMatchInlineSnapshot(`
      "export interface IFooFields {
        field: string;
      }

      /** Example interface */
      export interface IFoo extends PatchedEntry<IFooFields, \\"foo\\"> {}"
    `)
  })
})
