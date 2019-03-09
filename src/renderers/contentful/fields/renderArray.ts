import { Field, FieldItem } from "contentful"
import renderSymbol from "./renderSymbol"
import renderLink from "./renderLink"
import renderArrayOf from "../../typescript/renderArrayOf"

export default function renderArray(field: Field): string {
  // This is (incorrectly) an array in the Contentful typings
  const fieldItems = (<unknown>field.items) as FieldItem

  const fieldWithValidations: Field = {
    ...field,
    validations: fieldItems.validations || [],
  }

  switch (fieldItems.type) {
    case "Symbol": {
      return renderArrayOf(renderSymbol(fieldWithValidations))
    }

    case "Link": {
      return renderArrayOf(renderLink(fieldWithValidations))
    }
  }

  return renderArrayOf("unknown")
}
