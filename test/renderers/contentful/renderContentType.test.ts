import renderContentType from "../../../src/renderers/contentful/renderContentType"
import { ContentType, Sys, FieldItem, Entry } from "contentful"

describe("renderSymbol()", () => {
  const contentType: ContentType = {
    sys: {
      id: "myContentType",
    } as Sys,
    fields: [
      {
        id: "symbolField",
        name: "Symbol Field™",
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
        localized: false,
        type: "Symbol",
      },
      {
        id: "arrayField",
        name: "Array field",
        required: true,
        validations: [{}],
        items: (<unknown>{
          type: "Symbol",
          validations: [
            {
              in: ["one", "of", "the", "above"],
            },
          ],
        }) as FieldItem[], // incorrectly typed by Contentful, overriding
        disabled: false,
        omitted: false,
        localized: false,
        type: "Array",
      },
    ],
    description: "",
    displayField: "",
    name: "",
    toPlainObject: () => ({} as ContentType),
  }

  it("works with miscellaneous field types", () => {
    expect(renderContentType(contentType).trim()).toMatchInlineSnapshot(`
"interface IMyContentTypeFields {
      /** Symbol Field™ */
 symbolField: string | null;

/** Array field */
 arrayField: ('one' | 'of' | 'the' | 'above')[];
    };

    export interface IMyContentType extends Entry<IMyContentTypeFields> {};"
`)
  })
})
