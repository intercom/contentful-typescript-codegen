import { Field } from "contentful"
import renderInterfaceProperty from "../typescript/renderInterfaceProperty"

export default function renderField(field: Field, type: string): string {
  return renderInterfaceProperty(field.id, type, field.required, field.name)
}
