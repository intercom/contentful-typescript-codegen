export default function renderContentfulImports(localization: boolean = false): string {
  if (localization) {
    return `
    // THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

    import { Entry } from 'contentful'
    import { Document } from '@contentful/rich-text-types'
  `
  }

  return `
    // THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

    import { Asset, Entry } from 'contentful'
    import { Document } from '@contentful/rich-text-types'
  `
}
