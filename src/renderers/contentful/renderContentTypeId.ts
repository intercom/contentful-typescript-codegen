import { upperFirst, camelCase } from "lodash"

export default function renderContentTypeId(contentTypeId: string): string {
  return "I" + upperFirst(camelCase(contentTypeId))
}
