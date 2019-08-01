import renderNumber from "../../../../src/renderers/contentful/fields/renderNumber"
import { Field } from "contentful"

describe("renderNumber()", () => {
  const simpleNumber: Field = {
    type: "Number",
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
    expect(renderNumber(simpleNumber).trim()).toMatchInlineSnapshot(`"number"`)
  })
})
