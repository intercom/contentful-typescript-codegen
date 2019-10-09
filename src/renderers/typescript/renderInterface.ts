export default function renderInterface(
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
    export interface ${name} extends Entry<${name}Fields> {
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
