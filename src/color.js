import colorRegex from "./color-regex"
import { colorNames, nameLookup } from "./color-names"
import {
  hslToRGB,
  rgbToHSL,
  ensureAlpha,
  ensureHue,
  ensureValue,
  ensureHSL,
  ensureRGB,
} from "./color-utils"

const RGB = "rgb"
const HSL = "hsl"
const HEX = "hex"

function exists(...args) {
  return args.length > 0 && args.every(arg => arg !== null && arg !== undefined)
}

export default class Color {
  constructor(color) {
    this.state = {
      r: 0,
      g: 0,
      b: 0,
      h: null,
      s: null,
      l: null,
      a: 1,
    }
    if (color) {
      this.from(color)
    }
  }

  setRGB({ r, g, b }) {
    this.state.r = r
    this.state.g = g
    this.state.b = b
    this.state.h = null
    this.state.s = null
    this.state.l = null
  }

  setHSL({ h, s, l }) {
    this.state.r = null
    this.state.g = null
    this.state.b = null
    this.state.h = h
    this.state.s = s
    this.state.l = l
  }

  getRGB() {
    const { r, g, b, h, s, l } = this.state
    if (!exists(r, g, b)) {
      const rgb = hslToRGB(h, s, l)
      this.state.r = rgb.r
      this.state.g = rgb.g
      this.state.b = rgb.b
    }
    return {
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
    }
  }

  getHSL() {
    let { r, g, b, h, s, l } = this.state
    if (!exists(h, s, l)) {
      const hsl = rgbToHSL(r, g, b)
      this.state.h = hsl.h
      this.state.s = hsl.s
      this.state.l = hsl.l
    }
    return {
      h: this.state.h,
      s: this.state.s,
      l: this.state.l,
    }
  }

  from(color, type = null) {
    if (!color) {
      throw new Error("No color provided")
    } else if (typeof color === "string") {
      this.fromString(color, type)
    } else if (typeof color === "number") {
      this.fromNumber(color, type)
    } else if (Array.isArray(color)) {
      this.fromArray(color, type)
    } else {
      this.fromObject(color, type)
    }
  }

  fromString(color, type = null) {
    if (typeof color !== "string") return

    color = color.replace(/^\s+/, "").replace(/\s+$/, "").toLowerCase()

    if (colorNames[color]) {
      color = colorNames[color]
    } else if (color === "transparent") {
      this.state.a = 0
      return
    }

    let match
    if ((match = colorRegex.rgb.exec(color))) {
      this.setRGB(ensureRGB(match[1], match[2], match[3]))
    } else if ((match = colorRegex.rgba.exec(color))) {
      this.setRGB(ensureRGB(match[1], match[2], match[3]))
      this.state.a = ensureAlpha(match[4])
    } else if ((match = colorRegex.hsl.exec(color))) {
      this.setHSL(ensureHSL(match[1], match[2], match[3]))
    } else if ((match = colorRegex.hsla.exec(color))) {
      this.setHSL(ensureHSL(match[1], match[2], match[3]))
      this.state.a = ensureAlpha(match[4])
    } else if ((match = colorRegex.hex6.exec(color))) {
      const rgb = match.map(v => parseInt(v, 16))
      this.setRGB(ensureRGB(rgb[1], rgb[2], rgb[3]))
    } else if ((match = colorRegex.hex3.exec(color))) {
      const rgb = match.map(v => parseInt(v + "" + v, 16))
      this.setRGB(ensureRGB(rgb[1], rgb[2], rgb[3]))
    }
  }

  fromNumber(num) {
    if (typeof num !== "number") return
    let match
    const color = "" + num
    if ((match = colorRegex.hex6.exec(color))) {
      const rgb = match.map(v => parseInt(v, 16))
      this.setRGB(ensureRGB(rgb[1], rgb[2], rgb[3]))
    } else if ((match = colorRegex.hex3.exec(color))) {
      const rgb = match.map(v => parseInt(v + "" + v, 16))
      this.setRGB(ensureRGB(rgb[1], rgb[2], rgb[3]))
    }
  }

  fromObject(obj) {
    if (typeof obj !== "object") return
    if (exists(obj.r, obj.g, obj.b)) {
      this.setRGB(ensureRGB(obj.r, obj.g, obj.b))
    } else if (exists(obj.h, obj.s, obj.l)) {
      this.setHSL(ensureHSL(obj.h, obj.s, obj.l))
    }
    if (exists(obj.a)) {
      this.state.a = ensureAlpha(obj.a)
    }
  }

  fromArray(arr, type = RGB) {
    if (!Array.isArray(arr)) return
    if (exists(arr[0]) && exists(arr[1]) && exists(arr[2])) {
      if (type === HSL) {
        this.setHSL(ensureHSL(arr[0], arr[1], arr[2]))
      } else {
        this.setRGB(ensureRGB(arr[0], arr[1], arr[2]))
      }
    }
    if (exists(arr[3])) {
      this.state.a = ensureAlpha(arr[3])
    }
  }

  // getters

  get hue() {
    const { h } = this.getHSL()
    return Math.round(h)
  }

  get saturation() {
    const { s } = this.getHSL()
    return Math.round(s)
  }

  get lightness() {
    const { l } = this.getHSL()
    return Math.round(l)
  }

  get red() {
    const { r } = this.getRGB()
    return Math.round(r)
  }

  get green() {
    const { g } = this.getRGB()
    return Math.round(g)
  }

  get blue() {
    const { b } = this.getRGB()
    return Math.round(b)
  }

  get alpha() {
    return this.state.a
  }

  get rgb() {
    const rgb = Object.values(this.getRGB()).map(v => Math.round(v)).join(",")
    return `rgb(${rgb})`
  }

  get rgba() {
    const rgb = Object.values(this.getRGB()).map(v => Math.round(v)).join(",")
    return `rgba(${rgb},${this.state.a})`
  }

  get hsl() {
    const hsl = Object.values(this.getHSL())
      .map(v => Math.round(v))
      .map((v, i) => (i > 0 ? `${v}%` : v))
      .join(",")
    return `hsl(${hsl})`
  }

  get hsla() {
    const hsl = Object.values(this.getHSL())
      .map(v => Math.round(v))
      .map((v, i) => (i > 0 ? `${v}%` : v))
      .join(",")
    return `hsla(${hsl},${this.state.a})`
  }

  get hex() {
    const hex = Object.values(this.getRGB())
      .map(v => Math.round(v))
      .map(v => v.toString(16))
      .map(v => (v.length === 2 ? v : "0" + v))
      .join("")
    return `#${hex}`
  }

  get name() {
    const hex = Object.values(this.getRGB())
      .map(v => Math.round(v))
      .map(v => v.toString(16))
      .map(v => (v.length === 2 ? v : "0" + v))
      .join("")
    return nameLookup[hex] || false
  }

  get yiq() {
    const { hex } = this
    const r = parseInt(hex.substr(1, 2), 16)
    const g = parseInt(hex.substr(3, 2), 16)
    const b = parseInt(hex.substr(5, 2), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  // setters

  set hue(h) {
    const { s, l } = this.getHSL()
    h = ensureHue(h)
    this.setHSL({ h, s, l })
  }

  set saturation(s) {
    const { h, l } = this.getHSL()
    s = ensureValue(s, 100)
    this.setHSL({ h, s, l })
  }

  set lightness(l) {
    const { h, s } = this.getHSL()
    l = ensureValue(l, 100)
    this.setHSL({ h, s, l })
  }

  set red(r) {
    const { g, b } = this.getRGB()
    r = ensureValue(r, 255)
    this.setRGB({ r, g, b })
  }

  set green(g) {
    const { r, b } = this.getRGB()
    g = ensureValue(g, 255)
    this.setRGB({ r, g, b })
  }

  set blue(b) {
    const { r, g } = this.getRGB()
    b = ensureValue(b, 255)
    this.setRGB({ r, g, b })
  }

  set alpha(a) {
    this.state.a = ensureAlpha(a)
  }

  set rgb(rgb) {
    this.from(rgb, RGB)
  }

  set rgba(rgba) {
    this.from(rgba, RGB)
  }

  set hsl(hsl) {
    this.from(hsl, HSL)
  }

  set hsla(hsla) {
    this.from(hsla, HSL)
  }

  set hex(hex) {
    this.from(hex)
  }

  set name(name) {
    this.fromString(name)
  }

  // aliases

  get h() {
    return this.hue
  }
  set h(h) {
    this.hue = h
  }

  get s() {
    return this.saturation
  }
  set s(s) {
    this.saturation = s
  }

  get l() {
    return this.lightness
  }
  set l(l) {
    this.lightness = l
  }

  get r() {
    return this.red
  }
  set r(r) {
    this.red = r
  }

  get g() {
    return this.green
  }
  set g(g) {
    this.green = g
  }

  get b() {
    return this.blue
  }
  set b(b) {
    this.blue = b
  }

  get a() {
    return this.alpha
  }
  set a(a) {
    this.alpha = a
  }
}
