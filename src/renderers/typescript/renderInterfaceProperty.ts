export default function renderInterfaceProperty(
  name: string,
  type: string,
  required: boolean,
  description?: string,
): string {
  return [descriptionComment(description), `${name}: ${type}${required ? "" : " | null"};`].join(
    " ",
  )
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */`
  } else {
    return ""
  }
}
