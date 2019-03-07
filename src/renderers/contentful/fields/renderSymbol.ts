import { Field, FieldValidation } from "contentful"

import renderField from "./renderField"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderSymbol(field: Field) {
  const inValidation: FieldValidation | undefined = field.validations.find(
    validation => !!validation.in,
  )

  if (inValidation) {
    return renderField(field, renderUnionValues(inValidation.in!))
  } else {
    return renderField(field, "string")
  }
}
