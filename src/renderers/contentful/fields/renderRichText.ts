import { Field } from "contentful"

export default function renderRichText(
  field: Field,
  { compatibleWithRealResponses }: RenderingOptions,
): string {
  if (compatibleWithRealResponses) {
    // Contentful doesn't even come close to matching its own types here, so just YOLO it.
    return "any"
  } else {
    return "Document"
  }
}
