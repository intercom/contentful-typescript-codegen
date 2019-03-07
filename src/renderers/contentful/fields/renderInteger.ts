import { Field } from 'contentful'
import renderField from './renderField'

export default function renderInteger(field: Field): string {
  return renderField(field, 'number')
}
