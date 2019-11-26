import render from "./renderers/render"
import path from "path"
import { outputFileSync } from "fs-extra"

const meow = require("meow")

const cli = meow(
  `
	Usage
	  $ contentful-typescript-codegen --output <file> <options>

	Options
	  --output,      -o  Where to write to
    --poll,        -p  Continuously refresh types
    --interval N,  -i  The interval in seconds at which to poll (defaults to 15)
    --compatible       Outputs looser types that are compatible with real Contentful API responses (which has some unexpected behavior not matching Contentful's built-in types)

	Examples
	  $ contentful-typescript-codegen -o src/@types/generated/contentful.d.ts
`,
  {
    flags: {
      output: {
        type: "string",
        alias: "o",
        required: true,
      },
      poll: {
        type: "boolean",
        alias: "p",
        required: false,
      },
      interval: {
        type: "string",
        alias: "i",
        required: false,
      },
      compatible: {
        type: "string",
        required: false,
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
  const output = await render(contentTypes.items, locales.items, {
    compatibleWithRealResponses: cli.flags.compatible,
  })
  const outputPath = path.resolve(process.cwd(), outputFile)

  outputFileSync(outputPath, output)
}

runCodegen(cli.flags.output).catch(error => {
  console.error(error)
})

if (cli.flags.poll) {
  const intervalInSeconds = parseInt(cli.flags.interval, 10)

  if (!isNaN(intervalInSeconds) && intervalInSeconds > 0) {
    setInterval(() => runCodegen(cli.flags.output), intervalInSeconds * 1000)
  } else {
    throw new Error(`Expected a positive numeric interval, but got ${cli.flags.interval}`)
  }
}
