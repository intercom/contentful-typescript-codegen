import renderObject from "../../../../src/renderers/contentful/fields/renderObject"
import { Field } from "contentful"

describe("renderObject()", () => {
  const simpleObject: Field = {
    type: "Object",
    id: "fieldId",
    name: "Field Name",
    validations: [],
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works", () => {
    expect(renderObject(simpleObject).trim()).toMatchInlineSnapshot(`"Record<string, any>"`)
  })
})
