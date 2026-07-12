import renderRichText from "../../../../src/renderers/contentful-fields-only/fields/renderRichText"
import { Field } from "contentful"

describe("renderRichText()", () => {
  const simpleRichText: Field = {
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
    expect(renderRichText(simpleRichText).trim()).toMatchInlineSnapshot(`"unknown"`)
  })
})
