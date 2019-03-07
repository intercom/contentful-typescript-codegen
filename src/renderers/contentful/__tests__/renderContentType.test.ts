import renderContentType from "../renderContentType"
import { ContentType, Sys } from "contentful"

describe("renderSymbol()", () => {
  const contentType: ContentType = {
    sys: {
      id: "myContentType",
    } as Sys,
    fields: [
      {
        id: "field1",
        name: "Field One™",
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
        localized: false,
        type: "Symbol",
      },
    ],
    description: "",
    displayField: "",
    name: "",
    toPlainObject: () => ({} as ContentType),
  }

  it("works with a simple content type", () => {
    expect(renderContentType(contentType).trim()).toMatchInlineSnapshot(`
"interface IMyContentType extends Entry<{
      /** Field One™ */ field1: string | null;
    }> {};"
`)
  })
})
