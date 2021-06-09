import { Field } from "contentful"

import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderSymbol(field: Field) {
  const inValidation = Array.isArray(field.validations) && field.validations.find(validation => !!validation.in)

  if (inValidation) {
    return renderUnionValues(inValidation.in!.map(value => `'${value}'`))
  } else {
    return "string"
  }
}
