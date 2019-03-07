export default function renderUnion(name: string, values: string[]): string {
  return `
    type ${name} =${renderUnionValues(values)};
  `
}

function renderUnionValues(values: string[]): string {
  if (values.length === 0) {
    return ' never'
  } else {
    return '\n' + values.map(value => `  | '${value}'`).join('\n')
  }
}
