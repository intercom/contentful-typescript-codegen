import { Field, FieldItem } from "contentful"
import renderSymbol from "./renderSymbol"
import renderLink from "./renderLink"

export default function renderArray(field: Field): string {
  // This is (incorrectly) an array in the Contentful typings
  const fieldItems = (<unknown>field.items) as FieldItem

  switch (fieldItems.type) {
    case "Symbol": {
      return `${renderSymbol(field)}[]`
    }

    case "Link": {
      return `${renderLink(field)}[]`
    }
  }

  return "unknown[]"
}
