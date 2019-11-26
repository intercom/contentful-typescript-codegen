import { ContentType, Field, FieldType, Sys } from "contentful"

import renderInterface from "../typescript/renderInterface"
import renderField from "./renderField"
import renderContentTypeId from "./renderContentTypeId"

import renderArray from "./fields/renderArray"
import renderBoolean from "./fields/renderBoolean"
import renderLink from "./fields/renderLink"
import renderLocation from "./fields/renderLocation"
import renderNumber from "./fields/renderNumber"
import renderObject from "./fields/renderObject"
import renderRichText from "./fields/renderRichText"
import renderSymbol from "./fields/renderSymbol"

export default function renderContentType(contentType: ContentType, options: RenderingOptions) {
  return renderInterface(
    contentType.sys.id,
    renderContentTypeId(contentType.sys.id),
    renderContentTypeFields(contentType.fields, options),
    contentType.description,
    renderSys(contentType.sys),
  )
}

function renderContentTypeFields(fields: Field[], options: RenderingOptions): string {
  return fields
    .filter(field => !field.omitted)
    .map<string>(field => {
      const functionMap: Record<FieldType, (field: Field, options: RenderingOptions) => string> = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderSymbol,
        Integer: renderNumber,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderSymbol,
      }

      return renderField(field, functionMap[field.type](field, options))
    })
    .join("\n\n")
}

function renderSys(sys: Sys) {
  return ``
}
