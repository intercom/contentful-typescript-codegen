import { ContentType, Field, FieldType } from "contentful"
import { upperFirst, camelCase } from "lodash"

import renderInterface from "../typescript/renderInterface"

import renderBoolean from "./fields/renderBoolean"
import renderDate from "./fields/renderDate"
import renderInteger from "./fields/renderInteger"
import renderLocation from "./fields/renderLocation"
import renderNumber from "./fields/renderNumber"
import renderSymbol from "./fields/renderSymbol"

export default function renderContentType(contentType: ContentType) {
  const id = contentType.sys.id
  const idAsInterfaceName = "I" + upperFirst(camelCase(id))

  const renderedFields = renderContentTypeFields(contentType.fields)

  return renderInterface(idAsInterfaceName, renderedFields)
}

function renderContentTypeFields(fields: Field[]): string {
  return fields
    .map<string>(field => {
      const functionMap: Record<FieldType, (field: Field) => string> = {
        Array: undefined,
        Boolean: renderBoolean,
        Date: renderDate,
        Integer: renderInteger,
        Link: undefined,
        Location: renderLocation,
        Number: renderNumber,
        Object: undefined,
        RichText: undefined,
        Symbol: renderSymbol,
        Text: undefined,
      }

      return functionMap[field.type](field)
    })
    .join("\n\n")
}
