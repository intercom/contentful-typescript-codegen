import { Field } from "contentful"
import renderField from "./renderField"

export default function renderBoolean(field: Field) {
  return renderField(field, "boolean")
}
