import renderUnion from "../typescript/renderUnion"
import { Locale } from "contentful"
import { escapeSingleQuotes } from "../utils"

export default function renderAllLocales(locales: Locale[]): string {
  return renderUnion(
    "LOCALE_CODE",
    locales.map(locale => `'${locale.code}'`),
  )
}
