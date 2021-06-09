import { ContentType, Field } from "contentful"

export type OverridenContentTypes = Record<string, OverridenFields>

export type OverridenFields = Record<string, string>

export function getOverridenFields(
  contentType: ContentType,
  fieldOverrides?: OverridenContentTypes,
) {
  return fieldOverrides ? fieldOverrides[contentType.sys.id] : undefined
}

export function getOverridenFieldType(field: Field, overridenFields?: OverridenFields) {
  if (!overridenFields) {
    return undefined
  }

  return overridenFields[field.id]
}
