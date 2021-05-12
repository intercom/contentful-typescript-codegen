import { upperFirst, camelCase } from "lodash"

export default function renderContentTypeId(contentTypeId: string): string {
  return upperFirst(camelCase(contentTypeId))
}
