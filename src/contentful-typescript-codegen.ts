import render from "./renderers/render"
import renderFieldsOnly from "./renderers/renderFieldsOnly"
import path from "path"
import { outputFileSync } from "fs-extra"
import { OverridenContentTypes } from "./lib/fieldOverrides"

const meow = require("meow")

const cli = meow(
  `
  Usage
    $ contentful-typescript-codegen --output <file> <options>

  Options
    --output,      -o  Where to write to
    --poll,        -p  Continuously refresh types
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
  const getEnvironmentPath = path.resolve(process.cwd(), "./getContentfulEnvironment.js")
  const getEnvironment = require(getEnvironmentPath)
  const environment = await getEnvironment()
  const contentTypes = await environment.getContentTypes({ limit: 1000 })
  const locales = await environment.getLocales()
  const outputPath = path.resolve(process.cwd(), outputFile)

  let fieldOverrides: OverridenContentTypes | undefined
  let extraImports: string[] | undefined
  try {
    const getFieldOverridesPath = path.resolve(process.cwd(), "./getFieldOverrides.js")
    const { getImports, getOverridenContentTypes } = require(getFieldOverridesPath)
    extraImports = getImports() as string[]
    fieldOverrides = getOverridenContentTypes() as OverridenContentTypes
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.warn("`getFieldOverrides` file not found, skipping...")
      fieldOverrides = undefined
      extraImports = undefined
    } else {
      throw error
    }
  }

  let output
  if (cli.flags.fieldsOnly) {
    output = await renderFieldsOnly(contentTypes.items, {
      namespace: cli.flags.namespace,
      fieldOverrides,
    })
  } else {
    output = await render(contentTypes.items, locales.items, {
      localization: cli.flags.localization,
      namespace: cli.flags.namespace,
      fieldOverrides,
      extraImports,
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
