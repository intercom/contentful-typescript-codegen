import { escapeSingleQuotes } from "../../src/renderers/utils"

describe("escapeSingleQuotes()", () => {
  const testStrings = [
    "one's",
    "no quotes",
    "the quote's pie",
    "Tom's pie is better than quote's pie",
    "Alot of quotes after '''''",
    "''''' Alot of quotes before",
  ]

  const escapedStrings = [
    "one\\'s",
    "no quotes",
    "the quote\\'s pie",
    "Tom\\'s pie is better than quote\\'s pie",
    "Alot of quotes after \\'\\'\\'\\'\\'",
    "\\'\\'\\'\\'\\' Alot of quotes before",
  ]

  it("escapes all the single quotes", () => {
    expect(testStrings.map(escapeSingleQuotes)).toStrictEqual(escapedStrings)
  })
})
