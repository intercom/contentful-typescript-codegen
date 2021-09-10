import { escapeSingleQuotes } from "../../src/renderers/utils"

describe("escapeSingleQuotes()", () => {
  const testStrings = [
    "no quotes",
    "the quote's pie",
    "Tom's pie is better than quote's pie",
    "Alot of quotes after '''''",
    "''''' Alot of quotes before",
  ]

  const escapedStrings = [
    "no quotes",
    "the quote's pie",
    "Tom's pie is better than quote's pie",
    "Alot of quotes after '''''",
    "''''' Alot of quotes before",
  ]

  it("escapes all the single quotes", () => {
    expect(testStrings.map(escapeSingleQuotes)).toStrictEqual(escapedStrings)
  })
})
