import renderContentfulImports from "./contentful/renderContentfulImports"

function renderExtraImports(extraImports: string[]) {
  return extraImports.join("\n")
}

export default function renderImports(
  localization: boolean = false,
  extraImports?: string[],
): string {
  const contentfulImports = renderContentfulImports(localization)

  if (!extraImports) {
    return contentfulImports
  }

  return [contentfulImports, renderExtraImports(extraImports)].join("\n\n")
}
