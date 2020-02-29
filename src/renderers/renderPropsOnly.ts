import { ContentType } from "contentful"

import { format } from "prettier"

import renderContentType from "./contentful-props-only/renderContentType"

export default async function renderPropsOnly(contentTypes: ContentType[]) {
  const sortedContentTypes = contentTypes.sort()

  const source = renderAllContentTypes(sortedContentTypes)

  return format(source, { parser: "typescript" })
}

function renderAllContentTypes(contentTypes: ContentType[]): string {
  return contentTypes.map(contentType => renderContentType(contentType)).join("\n\n")
}
