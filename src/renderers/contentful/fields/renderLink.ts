import { Field } from "contentful"
import renderContentTypeId from "../renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderLink(field: Field): string {
  if (field.linkType === "Asset") {
    return "PatchedAsset"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation = field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(contentTypeValidation.linkContentType!.map(renderContentTypeId))
    } else {
      return "PatchedEntry<{ [fieldId: string]: unknown }, string>"
    }
  }

  return "unknown"
}
