export default function renderInterfaceProperty(
  name: string,
  type: string,
  required: boolean,
  description?: string,
): string {
  return [
    descriptionComment(description),
    name,
    required ? "" : "?",
    ": ",
    type,
    required ? "" : " | undefined",
    ";",
  ].join("")
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */\n`
  } else {
    return ""
  }
}
