import renderSymbol from "../../../../src/renderers/contentful/fields/renderSymbol"
import { Field } from "contentful"

describe("renderSymbol()", () => {
  const simpleString: Field = {
    type: "Symbol",
    validations: [],
    id: "fieldId",
    name: "Field Name",
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  const stringWithValidations: Field = {
    type: "Symbol",
    validations: [{ in: ["one", "or", "the", "other"] }],
    id: "fieldId",
    name: "Field Name",
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works with simple strings", () => {
    expect(renderSymbol(simpleString).trim()).toMatchInlineSnapshot(`"string"`)
  })

  it("works with strings with validations", () => {
    expect(renderSymbol(stringWithValidations).trim()).toMatchInlineSnapshot(
      `"'one' | 'or' | 'the' | 'other'"`,
    )
  })
})
