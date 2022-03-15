import { Field } from "contentful"
import renderContentTypeId from "../renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"
import { ContentfulRenderOptions } from "../options"

export default function renderLink(field: Field, { linkType }: ContentfulRenderOptions): string {
  const baseType = renderLinkBaseType(field)
  return linkType === undefined ? baseType : `${linkType}<${baseType}>`
}

function renderLinkBaseType(field: Field): string {
  if (field.linkType === "Asset") {
    return "Asset"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(contentTypeValidation.linkContentType!.map(renderContentTypeId))
    } else {
      return "Entry<{ [fieldId: string]: unknown }>"
    }
  }

  return "unknown"
}
