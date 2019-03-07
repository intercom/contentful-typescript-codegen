import { Field } from 'contentful'
import renderField from './renderField'

export default function renderNumber(field: Field): string {
  return renderField(field, 'number')
}
