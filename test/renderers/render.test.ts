import render from "../../src/renderers/render"
import { ContentType, Sys } from "contentful"

describe("render()", () => {
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

    expect(await render(contentTypes)).toMatchInlineSnapshot(`
"// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from \\"contentful\\"
import { Document } from \\"@contentful/rich-text-types\\"

export interface IMyContentTypeFields {
  /** Array field */
  arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
}

export interface IMyContentType extends Entry<IMyContentTypeFields> {}

type CONTENT_TYPE = \\"myContentType\\"
"
`)
  })
})