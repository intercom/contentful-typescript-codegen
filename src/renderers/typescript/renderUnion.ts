export default function renderUnion(name: string, values: string[]): string {
  return `
    export type ${name} = ${renderUnionValues(values)};
  `
}

export function renderUnionValues(values: string[]): string {
  if (values.length === 0) {
    return "never"
  } else {
    return values.join(" | ")
  }
}
