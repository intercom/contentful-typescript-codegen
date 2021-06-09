import { ContentType } from "contentful"

import { format, resolveConfig } from "prettier"

import { OverridenContentTypes } from "../lib/fieldOverrides"
import renderContentType from "./contentful-fields-only/renderContentType"
import renderNamespace from "./contentful/renderNamespace"

interface Options {
  namespace?: string
  fieldOverrides?: OverridenContentTypes
}

export default async function renderFieldsOnly(
  contentTypes: ContentType[],
  { namespace, fieldOverrides }: Options = {},
) {
  const sortedContentTypes = contentTypes.sort((a, b) => a.sys.id.localeCompare(b.sys.id))

  const typingsSource = renderAllContentTypes(sortedContentTypes, fieldOverrides)
  const source = [renderNamespace(typingsSource, namespace)].join("\n\n")

  const prettierConfig = await resolveConfig(process.cwd())

  return format(source, { ...prettierConfig, parser: "typescript" })
}

function renderAllContentTypes(
  contentTypes: ContentType[],
  fieldOverrides?: OverridenContentTypes,
): string {
  return contentTypes
    .map(contentType => renderContentType(contentType, fieldOverrides))
    .join("\n\n")
}
