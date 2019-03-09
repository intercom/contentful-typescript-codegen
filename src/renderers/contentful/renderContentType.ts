import { ContentType, Field, FieldType } from "contentful"

import renderInterface from "../typescript/renderInterface"
import renderField from "./renderField"
import renderContentTypeId from "./renderContentTypeId"

import renderArray from "./fields/renderArray"
import renderBoolean from "./fields/renderBoolean"
import renderDate from "./fields/renderDate"
import renderInteger from "./fields/renderInteger"
import renderLink from "./fields/renderLink"
import renderLocation from "./fields/renderLocation"
import renderNumber from "./fields/renderNumber"
import renderObject from "./fields/renderObject"
import renderRichText from "./fields/renderRichText"
import renderSymbol from "./fields/renderSymbol"
import renderText from "./fields/renderText"

export default function renderContentType(contentType: ContentType) {
  return renderInterface(
    renderContentTypeId(contentType.sys.id),
    renderContentTypeFields(contentType.fields),
  )
}

function renderContentTypeFields(fields: Field[]): string {
  return fields
    .map<string>(field => {
      const functionMap: Record<FieldType, (field: Field) => string> = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderDate,
        Integer: renderInteger,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderText,
      }

      return renderField(field, functionMap[field.type](field))
    })
    .join("\n\n")
}
