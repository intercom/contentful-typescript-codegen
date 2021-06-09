import renderContentType from "../../../src/renderers/contentful-fields-only/renderContentType"
import { ContentType, Sys } from "contentful"
import format from "../../support/format"
import { OverridenContentTypes } from "../../../src/lib/fieldOverrides"

describe("renderContentType()", () => {
  const fieldOverrides: OverridenContentTypes = {
    myContentType: {
      symbolField: "MyCustomType",
    },
  }

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
        items: {
          type: "Symbol",
          validations: [
            {
              in: ["one", "of", "the", "above"],
            },
          ],
        },
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
    expect(format(renderContentType(contentType))).toMatchInlineSnapshot(`
      "export interface IMyContentType {
        fields: {
          /** Symbol Field™ */
          symbolField?: string | undefined,

          /** Array field */
          arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
        };
        [otherKeys: string]: any;
      }"
    `)
  })

  it("works with miscellaneous field types", () => {
    expect(format(renderContentType(contentType, fieldOverrides))).toMatchInlineSnapshot(`
      "export interface IMyContentType {
        fields: {
          /** Symbol Field™ */
          symbolField?: MyCustomType | undefined,

          /** Array field */
          arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
        };
        [otherKeys: string]: any;
      }"
    `)
  })
})
