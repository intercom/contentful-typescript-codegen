import { Field } from "contentful"
import renderInterfaceProperty from "../typescript/renderInterfaceProperty"
import { Options } from "../render"

export default function renderField(field: Field, type: string, options: Options = {}): string {
  return renderInterfaceProperty(field.id, type, field.required, options.localization, field.name)
}
