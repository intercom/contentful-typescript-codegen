import { Locale } from "contentful"
import { escapeSingleQuotes } from "../utils"

export default function renderDefaultLocale(locales: Locale[]): string {
  const defaultLocale = locales.find(locale => locale.default)

  if (!defaultLocale) {
    throw new Error("Could not find a default locale in Contentful.")
  }

  return `export type CONTENTFUL_DEFAULT_LOCALE_CODE = '${escapeSingleQuotes(defaultLocale.code)}';`
}
