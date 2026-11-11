import renderFieldsOnly from "../../src/renderers/renderFieldsOnly"
import { ContentType, Sys } from "contentful"

const test = ({ prefix = "I", suffix = "" }: { prefix?: string; suffix?: string } = {}) => () => {
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
    expect(await renderFieldsOnly(contentTypes, { prefix, suffix })).toMatchInlineSnapshot(`
            "export interface ${prefix}MyContentType${suffix} {
              fields: {
                /** Array field */
                arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
              }
              [otherKeys: string]: any
            }
            "
        `)
  })

  it("renders a given content type inside a namespace", async () => {
    expect(await renderFieldsOnly(contentTypes, { prefix, suffix, namespace: "Codegen" }))
      .toMatchInlineSnapshot(`
      "declare namespace Codegen {
        export interface ${prefix}MyContentType${suffix} {
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
}

describe("renderFieldsOnly() with default 'I' prefix and no suffix", test())
describe(
  "renderFieldsOnly() with no prefix and 'Data' suffix",
  test({ prefix: "", suffix: "Data" }),
)
describe(
  "renderFieldsOnly() with 'C' prefix and 'Data' suffix",
  test({ prefix: "C", suffix: "Data" }),
)
