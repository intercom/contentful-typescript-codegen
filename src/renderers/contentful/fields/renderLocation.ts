import { Field } from "contentful"

export default function renderLocation(field: Field): string {
  return "{ lat: number, lon: number }"
}
