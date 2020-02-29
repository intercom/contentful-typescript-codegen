import { ContentType } from "contentful"
import renderContentTypeId from "../contentful/renderContentTypeId"
import { renderContentTypeFields } from "../contentful-fields-only/renderContentType"
import renderInterface from "../typescript/renderInterface"

export default function renderContentType(contentType: ContentType): string {
  const name = renderContentTypeId(contentType.sys.id)
  const fields = renderContentTypeFields(contentType.fields)

  return renderInterface({
    name,
    fields,
  })
}
