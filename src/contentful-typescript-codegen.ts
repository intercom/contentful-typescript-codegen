import render from "./renderers/render"
import { ContentTypeCollection, Space } from "contentful"
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
  const getSpacePath = path.resolve(process.cwd(), "./getContentfulSpace.js")
  const getSpace = require(getSpacePath)
  const space = (await getSpace()) as any
  const contentTypes = await space.getContentTypes()
  const output = await render(contentTypes.items)

  const outputPath = path.resolve(process.cwd(), outputFile)
  outputFileSync(outputPath, output)
}

runCodegen(cli.flags.output)

if (cli.flags.watch) {
  setInterval(() => runCodegen(cli.flags.output), 5000)
}
