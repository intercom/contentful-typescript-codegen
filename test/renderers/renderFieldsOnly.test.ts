import renderFieldsOnly from "../../src/renderers/renderFieldsOnly"
import { ContentType, Sys } from "contentful"

describe("renderFieldsOnly()", () => {
  it("renders given a content type", async () => {
    const contentTypes: ContentType[] = [
      {
        sys: {
          id: "myContentType",
        } as Sys,
        fields: [
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
      },
    ]

    expect(await renderFieldsOnly(contentTypes)).toMatchInlineSnapshot(`
      "export interface IMyContentType {
        fields: {
          /** Array field */
          arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
        }
        [otherKeys: string]: any
      }
      "
    `)

    expect(await renderFieldsOnly(contentTypes, { namespace: "Codegen" })).toMatchInlineSnapshot(`
      "declare namespace Codegen {
        export interface IMyContentType {
          fields: {
            /** Array field */
            arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
          }
          [otherKeys: string]: any
        }
      }

      export as namespace Codegen
      export = Codegen
      "
    `)
  })
})
