import { Field, FieldItem } from "contentful"
import renderSymbol from "./renderSymbol"
import renderLink from "./renderLink"

export default function renderArray(field: Field): string {
  // This is (incorrectly) an array in the Contentful typings
  const fieldItems = (<unknown>field.items) as FieldItem

  switch (fieldItems.type) {
    case "Symbol": {
      const fieldWithValidations: Field = {
        ...field,
        validations: fieldItems.validations || [],
      }

      return `(${renderSymbol(fieldWithValidations)})[]`
    }

    case "Link": {
      const fieldWithValidations: Field = {
        ...field,
        validations: fieldItems.validations || [],
      }

      return `(${renderLink(fieldWithValidations)})[]`
    }
  }

  return "unknown[]"
}
