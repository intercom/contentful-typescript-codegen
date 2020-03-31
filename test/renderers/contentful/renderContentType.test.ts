import renderContentType from "../../../src/renderers/contentful/renderContentType"
import { ContentType, Sys } from "contentful"
import format from "../../support/format"

describe("renderContentType()", () => {
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

  const contentTypeWithDescription: ContentType = {
    sys: {
      id: "myContentType",
    } as Sys,
    fields: [],
    description: "This is a description",
    displayField: "",
    name: "",
    toPlainObject: () => ({} as ContentType),
  }

  it("works with miscellaneous field types", () => {
    expect(format(renderContentType(contentType, false))).toMatchInlineSnapshot(`
            "export interface IMyContentTypeFields {
              /** Symbol Field™ */
              symbolField?: string | undefined;

              /** Array field */
              arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[];
            }

            export interface IMyContentType extends Entry<IMyContentTypeFields> {
              sys: {
                id: string,
                type: string,
                createdAt: string,
                updatedAt: string,
                locale: string,
                contentType: {
                  sys: {
                    id: \\"myContentType\\",
                    linkType: \\"ContentType\\",
                    type: \\"Link\\"
                  }
                }
              };
            }"
        `)
  })

  it("supports descriptions", () => {
    expect(format(renderContentType(contentTypeWithDescription, false))).toMatchInlineSnapshot(`
      "export interface IMyContentTypeFields {}

      /** This is a description */

      export interface IMyContentType extends Entry<IMyContentTypeFields> {
        sys: {
          id: string,
          type: string,
          createdAt: string,
          updatedAt: string,
          locale: string,
          contentType: {
            sys: {
              id: \\"myContentType\\",
              linkType: \\"ContentType\\",
              type: \\"Link\\"
            }
          }
        };
      }"
    `)
  })

  it("works with localized fields", () => {
    expect(format(renderContentType(contentType, true))).toMatchInlineSnapshot(`
            "export interface IMyContentTypeFields {
              /** Symbol Field™ */
              symbolField?: Record<LOCALE_CODE, string> | undefined;

              /** Array field */
              arrayField: Record<LOCALE_CODE, (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]>;
            }

            export interface IMyContentType extends Entry<IMyContentTypeFields> {
              sys: {
                id: string,
                type: string,
                createdAt: string,
                updatedAt: string,
                locale: string,
                contentType: {
                  sys: {
                    id: \\"myContentType\\",
                    linkType: \\"ContentType\\",
                    type: \\"Link\\"
                  }
                }
              };
            }"
        `)
  })
})
