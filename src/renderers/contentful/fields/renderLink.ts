import { Field } from "contentful"
import { renderContentTypeId } from "../renderContentType"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderLink(field: Field): string {
  if (field.linkType === "Asset") {
    return "Asset"
  }

  if (field.linkType === "Entry") {
    const validations: { linkContentType?: string[] }[] = field.validations
    const contentTypeValidation = validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation && contentTypeValidation.linkContentType) {
      return renderUnionValues(contentTypeValidation.linkContentType.map(renderContentTypeId))
    } else {
      return "Entry<unknown>"
    }
  }

  return "unknown"
}
