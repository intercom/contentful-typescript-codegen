import { Field } from "contentful"

import { renderUnionValues } from "../../typescript/renderUnion"
import { escapeSingleQuotes } from "../../utils"

export default function renderSymbol(field: Field) {
  const inValidation = field.validations.find(validation => !!validation.in)

  if (inValidation) {
    return renderUnionValues(inValidation.in!.map(value => `'${escapeSingleQuotes(value)}'`))
  } else {
    return "string"
  }
}
