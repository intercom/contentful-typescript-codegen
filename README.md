# contentful-typescript-codegen

Generate typings from your Contentful environment.

- Content Types become interfaces.
- Locales (and your default locale) become string types.
- Assets and Rich Text link to Contentful's types.

At Intercom, we use this in our [website] to increase developer confidence and productivity,
ensure that breaking changes to our Content Types don't cause an outage, and because it's neat.

[website]: https://www.intercom.com

## Usage

```sh
yarn add --dev contentful-typescript-codegen
```

Then, add the following to your `package.json`:

```jsonc
{
  // ...
  "scripts": {
    "contentful-typescript-codegen": "contentful-typescript-codegen --output @types/generated/contentful.d.ts"
  }
}
```

Feel free to change the output path to whatever you like.

Next, the codegen will expect you to have created a file called either `getContentfulEnvironment.js` or `getContentfulEnvironment.ts`
in the root of your project directory, which should export a promise that resolves with your Contentful environment.

The reason for this is that you can do whatever you like to set up your Contentful Management
Client. Here's an example of a JavaScript config:

```js
const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  })

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
}
```

And the same example in TypeScript:

```ts
import { strict as assert } from "assert"
import * as contentfulManagement from "contentful-management"
import { EnvironmentGetter } from "contentful-typescript-codegen"

const { CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } = process.env

assert(CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN)
assert(CONTENTFUL_SPACE_ID)
assert(CONTENTFUL_ENVIRONMENT)

const getContentfulEnvironment: EnvironmentGetter = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  })

  return contentfulClient
    .getSpace(CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(CONTENTFUL_ENVIRONMENT))
}

module.exports = getContentfulEnvironment
```

> **Note**
>
> `ts-node` must be installed to use a TypeScript config

### Command line options

```
Usage
  $ contentful-typescript-codegen --output <file> <options>

Options
  --output,      -o  Where to write to
  --poll,        -p  Continuously refresh types
  --interval N,  -i  The interval in seconds at which to poll (defaults to 15)
```

## Example output

Here's an idea of what the output will look like for a Content Type:

```ts
interface IBlogPostFields {
  /** Title */
  title: string

  /** Body */
  body: Document

  /** Author link */
  author: IAuthor

  /** Image */
  image: Asset

  /** Published? */
  published: boolean | null

  /** Tags */
  tags: string[]

  /** Blog CTA variant */
  ctaVariant: "new-cta" | "old-cta"
}

/**
 * A blog post.
 */
export interface IBlogPost extends Entry<IBlogPostFields> {}
```

You can see that a few things are handled for you:

- Documentation comments are automatically generated from Contentful descriptions.
- Links, like `author`, are resolved to other TypeScript interfaces.
- Assets are handled properly.
- Validations on symbols and text fields are expanded to unions.
- Non-required attributes automatically have `| null` appended to their type.
- The output is formatted using **your** Prettier config.
