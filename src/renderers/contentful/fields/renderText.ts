import { Field } from "contentful"
import renderSymbol from "./renderSymbol"

export default function renderText(field: Field): string {
  return renderSymbol(field)
}
