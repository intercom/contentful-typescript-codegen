export default function renderField(name: string, type: string, required: boolean): string {
  return `
    ${name}: ${type}${required ? '' : ' | null'};
  `
}
