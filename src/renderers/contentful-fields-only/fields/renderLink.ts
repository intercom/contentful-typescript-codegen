import { Field } from "contentful"
import renderContentTypeId from "../../contentful/renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"
import { Options } from "../../renderFieldsOnly"

export default function renderLink(field: Field, options: Options): string {
  if (field.linkType === "Asset") {
    return "any"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(
        contentTypeValidation.linkContentType!.map(link => renderContentTypeId(link, options)),
      )
    } else {
      return "unknown"
    }
  }

  return "unknown"
}
