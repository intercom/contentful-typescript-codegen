import { ContentType } from "contentful"

import { format, resolveConfig } from "prettier"

import renderContentfulImports from "./contentful/renderContentfulImports"
import renderContentType from "./contentful/renderContentType"
import renderUnion from "./typescript/renderUnion"

export default async function render(contentTypes: ContentType[]) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))

  const source = [
    renderContentfulImports(),
    renderAllContentTypes(sortedContentTypes),
    renderAllContentTypeIds(sortedContentTypes),
  ].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())
  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[]): string {
  return contentTypes.map(contentType => renderContentType(contentType)).join("\n\n")
}

function renderAllContentTypeIds(contentTypes: ContentType[]): string {
  return renderUnion("CONTENT_TYPE", contentTypes.map(contentType => `'${contentType.sys.id}'`))
}
