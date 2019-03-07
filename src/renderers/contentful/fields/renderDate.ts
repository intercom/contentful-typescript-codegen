import { Field } from 'contentful'
import renderField from './renderField'

export default function renderDate(field: Field): string {
  return renderField(field, 'string')
}
