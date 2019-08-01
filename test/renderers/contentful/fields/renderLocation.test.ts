import renderLocation from "../../../../src/renderers/contentful/fields/renderLocation"
import { Field } from "contentful"

describe("renderLocation()", () => {
  const simpleLocation: Field = {
    type: "Location",
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
    expect(renderLocation(simpleLocation).trim()).toMatchInlineSnapshot(
      `"{ lat: number, lon: number }"`,
    )
  })
})
