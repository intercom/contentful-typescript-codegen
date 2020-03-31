import { ContentType } from "contentful"

import { format } from "prettier"

import renderContentType from "./contentful-fields-only/renderContentType"
import renderNamespace from "./contentful/renderNamespace"

interface Options {
  namespace?: string
}

export default async function renderFieldsOnly(
  contentTypes: ContentType[],
  { namespace }: Options = {},
) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))

  const typingsSource = renderAllContentTypes(sortedContentTypes)
  const source = [renderNamespace(typingsSource, namespace)].join("\n\n")

  return format(source, { parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[]): string {
  return contentTypes.map(contentType => renderContentType(contentType)).join("\n\n")
}
