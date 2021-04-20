import renderImports from "../../../src/renderers/renderImports"
import format from "../../support/format"

const TEST_IMPORTS = ["import Foo from './bar';", "import { Bar } from '@baz';"]

describe("renderContentfulImports()", () => {
  it("renders the top of the codegen file", () => {
    expect(format(renderImports())).toMatchInlineSnapshot(`
      "// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

      import { Asset, Entry } from \\"contentful\\";
      import { Document } from \\"@contentful/rich-text-types\\";"
    `)
  })

  it("renders the localized top of the codegen file", () => {
    expect(format(renderImports(true))).toMatchInlineSnapshot(`
      "// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

      import { Entry } from \\"contentful\\";
      import { Document } from \\"@contentful/rich-text-types\\";"
    `)
  })

  it("renders the top of the codegen file with extra imports", () => {
    expect(format(renderImports(false, TEST_IMPORTS))).toMatchInlineSnapshot(`
      "// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

      import { Asset, Entry } from \\"contentful\\";
      import { Document } from \\"@contentful/rich-text-types\\";

      import Foo from \\"./bar\\";
      import { Bar } from \\"@baz\\";"
    `)
  })
})
