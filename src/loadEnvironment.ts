import * as path from "path"
import * as fs from "fs"
import { ContentfulCollection, ContentTypeCollection, LocaleCollection } from "contentful"

/* istanbul ignore next */
const interopRequireDefault = (obj: any): { default: any } =>
  obj && obj.__esModule ? obj : { default: obj }

type Registerer = { enabled(value: boolean): void }

let registerer: Registerer | null = null

function enableTSNodeRegisterer() {
  if (registerer) {
    registerer.enabled(true)

    return
  }

  try {
    registerer = require("ts-node").register() as Registerer
    registerer.enabled(true)
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      throw new Error(
        `'ts-node' is required for TypeScript configuration files. Make sure it is installed\nError: ${e.message}`,
      )
    }

    throw e
  }
}

function determineEnvironmentPath() {
  const pathWithoutExtension = path.resolve(process.cwd(), "./getContentfulEnvironment")

  if (fs.existsSync(`${pathWithoutExtension}.ts`)) {
    return `${pathWithoutExtension}.ts`
  }

  return `${pathWithoutExtension}.js`
}

export interface ContentfulEnvironment {
  getContentTypes(options: { limit: number }): Promise<ContentfulCollection<unknown>>
  getLocales(): Promise<ContentfulCollection<unknown>>
}

export type EnvironmentGetter = () => Promise<ContentfulEnvironment>

function getEnvironmentGetter(): EnvironmentGetter {
  const getEnvironmentPath = determineEnvironmentPath()

  if (getEnvironmentPath.endsWith(".ts")) {
    enableTSNodeRegisterer()

    return interopRequireDefault(require(getEnvironmentPath)).default
  }

  return require(getEnvironmentPath)
}

export async function loadEnvironment() {
  try {
    const getEnvironment = getEnvironmentGetter()
    const environment = await getEnvironment()

    return {
      contentTypes: (await environment.getContentTypes({ limit: 1000 })) as ContentTypeCollection,
      locales: (await environment.getLocales()) as LocaleCollection,
    }
  } finally {
    if (registerer) {
      registerer.enabled(false)
    }
  }
}
