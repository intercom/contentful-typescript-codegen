export default function renderInterface(
  id: string,
  name: string,
  fields: string,
  description?: string,
  contents?: string,
): string {
  return `
    export interface ${name}Fields {
      ${fields}
    };

    ${descriptionComment(description)}
    export interface ${name} extends PatchedEntry<${name}Fields, '${id}'> {
      ${contents || ""}
    };
  `
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */`
  }

  return ""
}
