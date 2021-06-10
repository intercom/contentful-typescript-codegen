import renderArray from "../../../../src/renderers/contentful/fields/renderArray"
import { Field } from "contentful"
import { defaultOptions } from "../../../../src/renderers/render"

const common: Field = {
  type: "Array",
  id: "fieldId",
  name: "Field Name",
  validations: [],
  omitted: false,
  required: true,
  disabled: false,
  linkType: undefined,
  localized: false,
}

describe("renderArray()", () => {
  it("renders an array of symbols", () => {
    const arrayOfSymbols: Field = {
      ...common,
      items: {
        type: "Symbol",
        validations: [],
      },
    }

    expect(renderArray(arrayOfSymbols, defaultOptions)).toMatchInlineSnapshot(`"(string)[]"`)
  })

  it("renders an array of symbols with validations", () => {
    const arrayOfValidatedSymbols: Field = {
      ...common,
      items: {
        type: "Symbol",
        validations: [{ in: ["one", "of", "these"] }],
      },
    }

    expect(renderArray(arrayOfValidatedSymbols, defaultOptions)).toMatchInlineSnapshot(
      `"('one' | 'of' | 'these')[]"`,
    )
  })

  it("renders an array of links of a particular type", () => {
    const arrayOfValidatedSymbols: Field = {
      ...common,
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["contentType1", "contentType2"] }],
      },
    }

    expect(renderArray(arrayOfValidatedSymbols, defaultOptions)).toMatchInlineSnapshot(
      `"(IContentType1 | IContentType2)[]"`,
    )
  })

  it("renders an array without items should throw error", () => {
    const arrayOfValidatedSymbols: Field = {
      ...common,
    }

    expect(() => renderArray(arrayOfValidatedSymbols, defaultOptions)).toThrowError(
      "Cannot render non-array field fieldId as an array",
    )
  })
})
