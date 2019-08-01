import renderBoolean from "../../../../src/renderers/contentful/fields/renderBoolean"
import { Field } from "contentful"

describe("renderSymbol()", () => {
  const simpleBoolean: Field = {
    type: "Boolean",
    id: "fieldId",
    name: "Field Name",
    validations: [],
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works with simple booleans", () => {
    expect(renderBoolean(simpleBoolean).trim()).toMatchInlineSnapshot(`"boolean"`)
  })
})
