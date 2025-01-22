import render from "./renderers/render"
import renderFieldsOnly from "./renderers/renderFieldsOnly"
import path from "path"
import { outputFileSync } from "fs-extra"
import { loadEnvironment } from "./loadEnvironment"

const meow = require("meow")

export { ContentfulEnvironment, EnvironmentGetter } from "./loadEnvironment"

const cli = meow(
  `
  Usage
    $ contentful-typescript-codegen --output <file> <options>

  Options
    --output,      -o  Where to write to
    --poll,        -p  Continuously refresh types
    --prefix STR,  -P  Define prefix STR for types, defaults to 'I'
    --suffix STR,  -S  Define suffix STR for types, defaults to empty string
    --no-prefix,   -nP Disable prefix completely
    --no-suffix,   -nS Disable suffix completely
    --interval N,  -i  The interval in seconds at which to poll (defaults to 15)
    --namespace N, -n  Wrap types in namespace N (disabled by default)
    --fields-only      Output a tree that _only_ ensures fields are valid
                       and present, and does not provide types for Sys,
                       Assets, or Rich Text. This is useful for ensuring raw
                       Contentful responses will be compatible with your code.
    --localization -l  Output fields with localized values

  Examples
    $ contentful-typescript-codegen -o src/@types/generated/contentful.d.ts
`,
  {
    flags: {
      output: {
        type: "string",
        alias: "o",
        isRequired: true,
      },
      fieldsOnly: {
        type: "boolean",
        isRequired: false,
      },
      poll: {
        type: "boolean",
        alias: "p",
        isRequired: false,
      },
      prefix: {
        type: "string",
        alias: "P",
        required: false,
      },
      suffix: {
        type: "string",
        alias: "S",
        required: false,
      },
      noPrefix: {
        type: "boolean",
        alias: "nP",
        required: false,
      },
      noSuffix: {
        type: "boolean",
        alias: "nS",
        required: false,
      },
      interval: {
        type: "string",
        alias: "i",
        isRequired: false,
      },
      namespace: {
        type: "string",
        alias: "n",
        isRequired: false,
      },
      localization: {
        type: "boolean",
        alias: "l",
        isRequired: false,
      },
    },
  },
)

async function runCodegen(outputFile: string) {
  const { contentTypes, locales } = await loadEnvironment()
  const outputPath = path.resolve(process.cwd(), outputFile)

  let output
  if (cli.flags.fieldsOnly) {
    output = await renderFieldsOnly(contentTypes.items, {
      namespace: cli.flags.namespace,
      prefix: cli.flags.noPrefix ? "" : cli.flags.prefix,
      suffix: cli.flags.noSuffix ? "" : cli.flags.suffix,
    })
  } else {
    output = await render(contentTypes.items, locales.items, {
      localization: cli.flags.localization,
      namespace: cli.flags.namespace,
      prefix: cli.flags.noPrefix ? "" : cli.flags.prefix,
      suffix: cli.flags.noSuffix ? "" : cli.flags.suffix,
    })
  }

  outputFileSync(outputPath, output)
}

runCodegen(cli.flags.output).catch(error => {
  console.error(error)
  process.exit(1)
})

if (cli.flags.poll) {
  const intervalInSeconds = parseInt(cli.flags.interval, 10)

  if (!isNaN(intervalInSeconds) && intervalInSeconds > 0) {
    setInterval(() => runCodegen(cli.flags.output), intervalInSeconds * 1000)
  } else {
    throw new Error(`Expected a positive numeric interval, but got ${cli.flags.interval}`)
  }
}
