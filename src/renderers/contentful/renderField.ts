import { Field } from "contentful"
import renderInterfaceProperty from "../typescript/renderInterfaceProperty"

export default function renderField(
  field: Field,
  type: string,
  localization: boolean = false,
): string {
  return renderInterfaceProperty(field.id, type, field.required, localization, field.name)
}
