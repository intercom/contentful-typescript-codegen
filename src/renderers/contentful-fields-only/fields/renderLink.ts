import { Field } from "contentful"
import renderContentTypeId from "../../contentful/renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderLink(field: Field): string {
  if (field.linkType === "Asset") {
    return "Asset"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(
        contentTypeValidation.linkContentType!.map(contentType => {
          return `Entry<${renderContentTypeId(contentType)}>`
        }),
      )
    } else {
      return "unknown"
    }
  }

  return "unknown"
}
