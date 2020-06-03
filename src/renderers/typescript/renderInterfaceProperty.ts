export default function renderInterfaceProperty(
  name: string,
  type: string,
  required: boolean,
  localization: boolean,
  localized: boolean,
  description?: string,
): string {
  return [
    descriptionComment(description),
    name,
    required ? "" : "?",
    ": ",
    localization ? renderLocalizedField(localized, type) : type,
    required ? "" : " | undefined",
    ";",
  ].join("")
}

function renderLocalizedField(localized: boolean, type: string) {
  return localized ? `LocalizedField<${type}>` : `DefaultLocalizedField<${type}>`
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */\n`
  } else {
    return ""
  }
}
