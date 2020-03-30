import { ContentType } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentType from "./contentful-fields-only/renderContentType"

export default async function renderFieldsOnly(contentTypes: ContentType[]) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))

  const source = renderAllContentTypes(sortedContentTypes)

  const prettierConfig = await resolveConfig(process.cwd())

  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[]): string {
  return contentTypes.map(contentType => renderContentType(contentType)).join("\n\n")
}
