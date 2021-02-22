import renderFieldsOnly from "../../src/renderers/renderFieldsOnly"
import { ContentType, Sys } from "contentful"

describe("renderFieldsOnly()", () => {
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

  it("renders a given content type", async () => {
    expect(await renderFieldsOnly(contentTypes)).toMatchInlineSnapshot(`
            "export interface IMyContentType {
              /** Array field */
              arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
            }
            "
        `)
  })

  it("renders a given content type inside a namespace", async () => {
    expect(await renderFieldsOnly(contentTypes, { namespace: "Codegen" })).toMatchInlineSnapshot(`
      "declare namespace Codegen {
        export interface IMyContentType {
          /** Array field */
          arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
        }
      }

      export as namespace Codegen
      export = Codegen
      "
    `)
  })
})
