import renderArray from "../../../../src/renderers/contentful/fields/renderArray"
import { Field, FieldItem } from "contentful"

describe("renderArray()", () => {
  it("renders an array of symbols", () => {
    const arrayOfSymbols: Field = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: ({
        type: "Symbol",
        validations: [],
      } as unknown) as FieldItem[],
    }

    expect(renderArray(arrayOfSymbols)).toMatchInlineSnapshot(`"(string)[]"`)
  })

  it("renders an array of symbols with validations", () => {
    const arrayOfValidatedSymbols: Field = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: ({
        type: "Symbol",
        validations: [{ in: ["one", "of", "these"] }],
      } as unknown) as FieldItem[],
    }

    expect(renderArray(arrayOfValidatedSymbols)).toMatchInlineSnapshot(
      `"('one' | 'of' | 'these')[]"`,
    )
  })

  it("renders an array of links of a particular type", () => {
    const arrayOfValidatedSymbols: Field = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: ({
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["contentType1", "contentType2"] }],
      } as unknown) as FieldItem[],
    }

    expect(renderArray(arrayOfValidatedSymbols)).toMatchInlineSnapshot(
      `"(IContentType1 | IContentType2)[]"`,
    )
  })

  it("handles mysterious cases", () => {
    const arrayOfValidatedSymbols: Field = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: ({
        type: "Unknown",
        validations: [],
      } as unknown) as FieldItem[],
    }

    expect(renderArray(arrayOfValidatedSymbols)).toMatchInlineSnapshot(`"(unknown)[]"`)
  })
})
