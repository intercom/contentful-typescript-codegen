import { Field } from "contentful"
import renderContentTypeId from "../../contentful/renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderLink(field: Field): string {
  if (field.linkType === "Asset") {
    return "any"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(contentTypeValidation.linkContentType!.map(renderContentTypeId))
    } else {
      return "unknown"
    }
  }

  return "unknown"
}
