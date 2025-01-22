import { Field } from "contentful"
import renderContentTypeId from "../renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"
import { Options } from "../../render"

export default function renderLink(field: Field, options: Options): string {
  if (field.linkType === "Asset") {
    return "Asset"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(
        contentTypeValidation.linkContentType!.map(link => renderContentTypeId(link, options)),
      )
    } else {
      return "Entry<{ [fieldId: string]: unknown }>"
    }
  }

  return "unknown"
}
