import render from "./renderers/render"
import path from "path"
import { outputFileSync } from "fs-extra"

const meow = require("meow")

const cli = meow(
  `
	Usage
	  $ contentful-typescript-codegen --output <file> <options>

	Options
	  --output, -o  Where to write to
	  --watch,  -w  Continuously output

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
      watch: {
        type: "boolean",
        alias: "w",
        required: false,
      },
    },
  },
)

async function runCodegen(outputFile: string) {
  const getEnvironmentPath = path.resolve(process.cwd(), "./getContentfulEnvironment.js")
  const getEnvironment = require(getEnvironmentPath)
  const environment = await getEnvironment()
  const contentTypes = await environment.getContentTypes()
  const locales = await environment.getLocales()
  const output = await render(contentTypes.items, locales.items)

  const outputPath = path.resolve(process.cwd(), outputFile)
  outputFileSync(outputPath, output)
}

runCodegen(cli.flags.output).catch(error => {
  console.error(error)
})

if (cli.flags.watch) {
  setInterval(() => runCodegen(cli.flags.output), 5000)
}
