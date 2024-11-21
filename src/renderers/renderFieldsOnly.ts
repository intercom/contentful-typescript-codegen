import { ContentType } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentType from "./contentful-fields-only/renderContentType"
import renderNamespace from "./contentful/renderNamespace"

export interface Options {
  namespace?: string
  prefix?: string
  suffix?: string
}

export default async function renderFieldsOnly(contentTypes: ContentType[], options: Options) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))

  const typingsSource = renderAllContentTypes(sortedContentTypes, options)
  const source = [renderNamespace(typingsSource, options.namespace)].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())

  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[], options: Options): string {
  return contentTypes.map(contentType => renderContentType(contentType, options)).join("\n\n")
}
