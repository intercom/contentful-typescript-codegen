import { Locale } from "contentful"
import format from "../../support/format"
import renderAllLocales from "../../../src/renderers/contentful/renderAllLocales"

describe("renderSymbol()", () => {
  const locales: Locale[] = [
    {
      name: "English (US)",
      fallbackCode: null,
      code: "en-US",
      default: true,
      sys: {} as Locale["sys"],
    },
    {
      name: "Brazilian Portuguese",
      fallbackCode: "en-US",
      code: "pt-BR",
      default: false,
      sys: {} as Locale["sys"],
    },
  ]

  it("works with a list of locales", () => {
    expect(format(renderAllLocales(locales))).toMatchInlineSnapshot(
      `"export type LOCALE_CODE = \\"en-US\\" | \\"pt-BR\\";"`,
    )
  })
})
