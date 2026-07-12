import renderLink from "../../../../src/renderers/contentful/fields/renderLink"
import { Field } from "contentful"

describe("renderLink()", () => {
  it("renders a simple entry link", () => {
    const simpleEntryLink: Field = {
      id: "validatedEntryLink",
      name: "Entry Link",
      type: "Link",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      linkType: "Entry",
    }

    expect(renderLink(simpleEntryLink)).toMatchInlineSnapshot(
      `"Entry<{ [fieldId: string]: unknown }>"`,
    )
  })

  it("renders a link with validations", () => {
    const validatedEntryLink: Field = {
      id: "validatedEntryLink",
      name: "Entry Link",
      type: "Link",
      localized: false,
      required: false,
      validations: [{ linkContentType: ["linkToOtherThing"] }],
      disabled: false,
      omitted: false,
      linkType: "Entry",
    }

    expect(renderLink(validatedEntryLink)).toMatchInlineSnapshot(`"ILinkToOtherThing | undefined"`)
  })

  it("renders an asset link", () => {
    const assetLink: Field = {
      id: "assetLink",
      name: "Asset Link",
      type: "Link",
      linkType: "Asset",
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    }

    expect(renderLink(assetLink)).toMatchInlineSnapshot(`"Asset"`)
  })

  it("handles mysteries", () => {
    const mysteryLink: Field = {
      id: "mysteryLink",
      name: "Mystery Link",
      type: "Link",
      linkType: "Idk",
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    }

    expect(renderLink(mysteryLink)).toMatchInlineSnapshot(`"unknown"`)
  })
})
