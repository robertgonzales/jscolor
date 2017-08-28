const CSS_INT = "[-\\+]?\\d+%?"
const CSS_NUM = "[-\\+]?\\d*\\.\\d+%?"
const CSS_UNIT = `(?:${CSS_NUM})|(?:${CSS_INT})`
const MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`
const MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`

export default {
  rgb: new RegExp("rgb" + MATCH3),
  rgba: new RegExp("rgba" + MATCH4),
  hsl: new RegExp("hsl" + MATCH3),
  hsla: new RegExp("hsla" + MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}
