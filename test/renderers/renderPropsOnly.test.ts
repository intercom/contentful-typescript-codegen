import renderPropsOnly from "../../src/renderers/renderPropsOnly"
import { ContentType, Sys } from "contentful"

describe("renderPropsOnly()", () => {
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

    expect(await renderPropsOnly(contentTypes)).toMatchInlineSnapshot(`
      "export interface IMyContentType {
        /** Array field */
        arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[];
      }
      "
    `)
  })
})
