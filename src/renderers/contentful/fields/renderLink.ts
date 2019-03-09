import { Field } from "contentful"
import { renderContentTypeId } from "../renderContentType"

export default function renderLink(field: Field): string {
  if (field.linkType === "Asset") {
    return "Asset"
  }

  if (field.linkType === "Entry") {
    const validations: { linkContentType?: string[] }[] = field.validations
    const contentTypeValidation = validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation && contentTypeValidation.linkContentType) {
      return contentTypeValidation.linkContentType.map(renderContentTypeId).join(" | ")
    } else {
      return "Entry<unknown>"
    }
  }

  return "unknown"
}
