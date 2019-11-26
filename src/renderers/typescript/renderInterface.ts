export default function renderInterface({
  name,
  extension,
  fields,
  description,
}: {
  name: string
  extension?: string
  fields: string
  description?: string
}) {
  return `
    ${description ? `/** ${description} */` : ""}
    export interface ${name} ${extension ? `extends ${extension}` : ""} {
      ${fields}
    }
  `
}
