import { upperFirst, camelCase } from "lodash"
import { Options } from "../render"

export default function renderContentTypeId(contentTypeId: string, options: Options): string {
  let str = upperFirst(camelCase(contentTypeId))

  if (options.prefix === undefined) options.prefix = "I"

  if (options.prefix) str = options.prefix + str
  if (options.suffix) str = str + options.suffix

  return str
}
