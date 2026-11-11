import { Field } from "contentful"
import renderSymbol from "../../contentful/fields/renderSymbol"
import renderLink from "../../contentful-fields-only/fields/renderLink"
import renderArrayOf from "../../typescript/renderArrayOf"
import { Options } from "../../renderFieldsOnly"

export default function renderArray(field: Field, options: Options): string {
  if (!field.items) {
    throw new Error(`Cannot render non-array field ${field.id} as an array`)
  }

  const fieldWithValidations: Field = {
    ...field,
    linkType: field.items.linkType,
    validations: field.items.validations || [],
  }

  switch (field.items.type) {
    case "Symbol": {
      return renderArrayOf(renderSymbol(fieldWithValidations))
    }

    case "Link": {
      return renderArrayOf(renderLink(fieldWithValidations, options))
    }
  }
}
