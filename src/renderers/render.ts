import { ContentType, Locale } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentfulImports from "./contentful/renderContentfulImports"
import renderContentType from "./contentful/renderContentType"
import renderUnion from "./typescript/renderUnion"
import renderAllLocales from "./contentful/renderAllLocales"
import renderDefaultLocale from "./contentful/renderDefaultLocale"
import renderNamespace from "./contentful/renderNamespace"
import renderLocalizedTypes from "./contentful/renderLocalizedTypes"

export interface Options {
  localization?: boolean
  namespace?: string
  prefix?: string
  suffix?: string
}

export default async function render(
  contentTypes: ContentType[],
  locales: Locale[],
  options: Options = {},
) {
  const { namespace, localization = false } = options
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))
  const sortedLocales = locales.sort((a, b) => a.code.localeCompare(b.code))

  const typingsSource = [
    renderAllContentTypes(sortedContentTypes, options),
    renderAllContentTypeIds(sortedContentTypes),
    renderAllLocales(sortedLocales),
    renderDefaultLocale(sortedLocales),
    renderLocalizedTypes(localization),
  ].join("\n\n")

  const source = [
    renderContentfulImports(localization),
    renderNamespace(typingsSource, namespace),
  ].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())
  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[], options: Options = {}): string {
  return contentTypes.map(contentType => renderContentType(contentType, options)).join("\n\n")
}

function renderAllContentTypeIds(contentTypes: ContentType[]): string {
  return renderUnion("CONTENT_TYPE", contentTypes.map(contentType => `'${contentType.sys.id}'`))
}
