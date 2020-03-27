import { ContentType, Locale } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentfulImports from "./contentful/renderContentfulImports"
import renderContentType from "./contentful/renderContentType"
import renderUnion from "./typescript/renderUnion"
import renderAllLocales from "./contentful/renderAllLocales"
import renderDefaultLocale from "./contentful/renderDefaultLocale"

export default async function render(
  contentTypes: ContentType[],
  locales: Locale[],
  namespace: string | null,
) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))
  const sortedLocales = locales.sort((a, b) => a.code.localeCompare(b.code))

  const typings = [
    renderAllContentTypes(sortedContentTypes),
    renderAllContentTypeIds(sortedContentTypes),
    renderAllLocales(sortedLocales),
    renderDefaultLocale(sortedLocales),
  ].join("\n\n")

  const source = [renderContentfulImports(), wrapInNamespace(typings, namespace)].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())
  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[]): string {
  return contentTypes.map(contentType => renderContentType(contentType)).join("\n\n")
}

function renderAllContentTypeIds(contentTypes: ContentType[]): string {
  return renderUnion("CONTENT_TYPE", contentTypes.map(contentType => `'${contentType.sys.id}'`))
}

function wrapInNamespace(source: string, namespace: string | null) {
  if (!namespace) return source

  return `
    declare namespace ${namespace} {
    ${source}
    }

    export as namespace ${namespace}
    export=${namespace}
  `
}
