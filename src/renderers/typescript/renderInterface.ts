export default function renderInterface(name: string, fields: string): string {
  return `
    interface ${name}Fields {
      ${fields}
    };

    export interface ${name} extends Entry<${name}Fields> {};
  `
}
