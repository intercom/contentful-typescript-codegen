interface RenderingOptions {
  /** Contentful's types don't accurately represent what's returned by the Content Delivery API.
   * This makes it so that the codegen produces types that allow for some wiggle room around extra
   * fields, rich text types, and some other things.
   */
  compatibleWithRealResponses: boolean
}
