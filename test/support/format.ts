import { format as prettierFormat } from "prettier"

export default function format(source: string): string {
  return prettierFormat(source, { parser: "babel" })
}
