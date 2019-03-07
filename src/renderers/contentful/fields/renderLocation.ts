import { Field } from 'contentful'
import renderField from './renderField'

export default function renderLocation(field: Field): string {
  return renderField(field, '{ lat: number, lon: number }')
}
