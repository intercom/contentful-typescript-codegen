import { Field } from "contentful"

export default function renderObject(field: Field): string {
  return "Record<string, any>"
}
