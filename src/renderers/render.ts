import { ContentType, Locale } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentfulImports from "./contentful/renderContentfulImports"
import renderContentType from "./contentful/renderContentType"
import renderUnion from "./typescript/renderUnion"
import renderAllLocales from "./contentful/renderAllLocales"
import renderDefaultLocale from "./contentful/renderDefaultLocale"
import renderLocalizedTypes from "./contentful/renderLocalizedTypes"

interface Options {
  localization?: boolean
}

export default async function render(
  contentTypes: ContentType[],
  locales: Locale[],
  { localization = false }: Options = {},
) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))
  const sortedLocales = locales.sort((a, b) => a.code.localeCompare(b.code))

  const source = [
    renderContentfulImports(localization),
    renderAllContentTypes(sortedContentTypes, localization),
    renderAllContentTypeIds(sortedContentTypes),
    renderAllLocales(sortedLocales),
    renderDefaultLocale(sortedLocales),
    renderLocalizedTypes(localization),
  ].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())
  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[], localization: boolean): string {
  return contentTypes.map(contentType => renderContentType(contentType, localization)).join("\n\n")
}

function renderAllContentTypeIds(contentTypes: ContentType[]): string {
  return renderUnion("CONTENT_TYPE", contentTypes.map(contentType => `'${contentType.sys.id}'`))
}
