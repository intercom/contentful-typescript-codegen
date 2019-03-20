import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import typescript from "rollup-plugin-typescript2"
import json from "rollup-plugin-json"
import shebang from "rollup-plugin-shebang"

const pkg = require("./package.json")

const libraryName = "contentful-typescript-codegen"

export default {
  input: `src/${libraryName}.ts`,
  output: [{ file: pkg.main, format: "cjs", sourcemap: true }],
  external: ["prettier", "lodash", "path", "fs", "fs-extra", "meow"],
  watch: {
    include: "src/**",
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({
      namedExports: {
        "node_modules/prettier/index.js": ["format", "resolveConfig"],
        "node_modules/lodash/lodash.js": ["camelCase", "upperFirst"],
      },
    }),
    resolve(),
    sourceMaps(),
  ],
}
