import { ContentType, Field, FieldType, Sys } from "contentful"

import {
  getOverridenFields,
  getOverridenFieldType,
  OverridenContentTypes,
  OverridenFields,
} from "../../lib/fieldOverrides"
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

export default function renderContentType(
  contentType: ContentType,
  localization: boolean,
  fieldOverrides?: OverridenContentTypes,
): string {
  const name = renderContentTypeId(contentType.sys.id)
  const overridenFields = getOverridenFields(contentType, fieldOverrides)
  const fields = renderContentTypeFields(contentType.fields, localization, overridenFields)
  const sys = renderSys(contentType.sys)

  return `
    ${renderInterface({ name: `${name}Fields`, fields })}

    ${descriptionComment(contentType.description)}
    ${renderInterface({ name, extension: `Entry<${name}Fields>`, fields: sys })}
  `
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */`
  }

  return ""
}

function renderContentTypeFields(
  fields: Field[],
  localization: boolean,
  overridenFields?: OverridenFields,
): string {
  return fields
    .filter(field => !field.omitted)
    .map<string>(field => {
      const overridenType = getOverridenFieldType(field, overridenFields)

      const functionMap: Record<FieldType, (field: Field) => string> = {
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

      return renderField(field, overridenType || functionMap[field.type](field), localization)
    })
    .join("\n\n")
}

function renderSys(sys: Sys) {
  return `
    sys: {
      id: string;
      type: string;
      createdAt: string;
      updatedAt: string;
      locale: string;
      contentType: {
        sys: {
          id: '${sys.id}';
          linkType: 'ContentType';
          type: 'Link';
        }
      }
    }
  `
}
