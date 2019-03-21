export default function renderInterface(
  name: string,
  fields: string,
  description?: string,
): string {
  return `
    export interface ${name}Fields {
      ${fields}
    };

    ${descriptionComment(description)}
    export interface ${name} extends Entry<${name}Fields> {};
  `
}

function descriptionComment(description: string | undefined) {
  if (description) {
    return `/** ${description} */`
  }

  return ""
}
