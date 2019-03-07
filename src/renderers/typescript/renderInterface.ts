export default function renderInterface(name: string, fields: string): string {
  return `
    interface ${name} extends Entry<{
      ${fields}
    }> {};
  `
}
