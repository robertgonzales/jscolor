const exists = value => value !== null && value !== undefined

// modes
const RGB = "rgb"
const HSL = "hsl"
const HEX = "hex"

// matchers
const CSS_INT = "[-\\+]?\\d+%?"
const CSS_NUM = "[-\\+]?\\d*\\.\\d+%?"
const CSS_UNIT = "(?:" + CSS_NUM + ")|(?:" + CSS_INT + ")"
const MATCH3 =
  "[\\s|\\(]+(" +
  CSS_UNIT +
  ")[,|\\s]+(" +
  CSS_UNIT +
  ")[,|\\s]+(" +
  CSS_UNIT +
  ")\\s*\\)?"
const MATCH4 =
  "[\\s|\\(]+(" +
  CSS_UNIT +
  ")[,|\\s]+(" +
  CSS_UNIT +
  ")[,|\\s]+(" +
  CSS_UNIT +
  ")[,|\\s]+(" +
  CSS_UNIT +
  ")\\s*\\)?"

const matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + MATCH3),
  rgba: new RegExp("rgba" + MATCH4),
  hsl: new RegExp("hsl" + MATCH3),
  hsla: new RegExp("hsla" + MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

class Color {
  static get names() {
    return {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightslategrey: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32",
    }
  }

  static get reverseNames() {
    const { names } = Color
    let reversed = {}
    for (let name in names) {
      const value = names[name]
      reversed[value] = name
    }
    return reversed
  }

  static hslToRGB(h, s, l) {
    ;(h /= 360), (s /= 100), (l /= 100)
    var r, g, b
    if (s == 0) {
      r = g = b = l
    } else {
      function hueToRGB(p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hueToRGB(p, q, h + 1 / 3)
      g = hueToRGB(p, q, h)
      b = hueToRGB(p, q, h - 1 / 3)
    }
    return { r: r * 255, g: g * 255, b: b * 255 }
  }

  static rgbToHSL(r, g, b) {
    ;(r /= 255), (g /= 255), (b /= 255)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    if (max == min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  static ensureAlpha(a) {
    a = parseFloat(a)
    if (isNaN(a)) return 1
    return Math.max(0, Math.min(1, a))
  }

  static ensureHue(h) {
    h = parseInt(h)
    if (isNaN(h)) return 0
    const hue = h % 360
    return hue < 0 ? 360 + hue : hue
  }

  static ensureValue(v, max) {
    if (typeof v === "string" && v.indexOf("%") > -1) {
      v = parseInt(v) / 100 * max
    } else {
      v = parseInt(v)
    }
    if (isNaN(v)) return 0
    return Math.max(0, Math.min(max, v))
  }

  static ensureHSL(h, s, l) {
    return {
      h: Color.ensureHue(h),
      s: Color.ensureValue(s, 100),
      l: Color.ensureValue(l, 100),
    }
  }

  static ensureRGB(r, g, b) {
    return {
      r: Color.ensureValue(r, 255),
      g: Color.ensureValue(g, 255),
      b: Color.ensureValue(b, 255),
    }
  }

  constructor(color) {
    this.state = {
      color: { r: 0, g: 0, b: 0 },
      alpha: 1,
      mode: RGB,
    }
    if (color) {
      this.from(color)
    }
  }

  getRGB() {
    if (this.state.mode === RGB) {
      return this.state.color
    } else {
      const { h, s, l } = this.state.color
      return Color.hslToRGB(h, s, l)
    }
  }

  getHSL() {
    if (this.state.mode === HSL) {
      return this.state.color
    } else {
      const { r, g, b } = this.state.color
      return Color.rgbToHSL(r, g, b)
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

    if (Color.names[color]) {
      color = Color.names[color]
    } else if (color === "transparent") {
      this.state.alpha = 0
      return
    }

    let match
    if ((match = matchers.rgb.exec(color))) {
      this.state.color = Color.ensureRGB(match[1], match[2], match[3])
      this.state.mode = RGB
    } else if ((match = matchers.rgba.exec(color))) {
      this.state.color = Color.ensureRGB(match[1], match[2], match[3])
      this.state.alpha = Color.ensureAlpha(match[4])
      this.state.mode = RGB
    } else if ((match = matchers.hsl.exec(color))) {
      this.state.color = Color.ensureHSL(match[1], match[2], match[3])
      this.state.mode = HSL
    } else if ((match = matchers.hsla.exec(color))) {
      this.state.color = Color.ensureHSL(match[1], match[2], match[3])
      this.state.alpha = Color.ensureAlpha(match[4])
      this.state.mode = HSL
    } else if ((match = matchers.hex6.exec(color))) {
      const rgb = match.map(v => parseInt(v, 16))
      this.state.color = Color.ensureRGB(rgb[1], rgb[2], rgb[3])
      this.state.mode = RGB
    } else if ((match = matchers.hex3.exec(color))) {
      const rgb = match.map(v => parseInt(v + "" + v, 16))
      this.state.color = Color.ensureRGB(rgb[1], rgb[2], rgb[3])
      this.state.mode = RGB
    }
  }

  fromNumber(num) {
    if (typeof num !== "number") return
    let match
    const color = "" + num
    if ((match = matchers.hex6.exec(color))) {
      const rgb = match.map(v => parseInt(v, 16))
      this.state.color = Color.ensureRGB(rgb[1], rgb[2], rgb[3])
      this.state.mode = RGB
    } else if ((match = matchers.hex3.exec(color))) {
      const rgb = match.map(v => parseInt(v + "" + v, 16))
      this.state.color = Color.ensureRGB(rgb[1], rgb[2], rgb[3])
      this.state.mode = RGB
    }
  }

  fromObject(obj) {
    if (typeof obj !== "object") return
    if (exists(obj.r) && exists(obj.g) && exists(obj.b)) {
      this.state.color = Color.ensureRGB(obj.r, obj.g, obj.b)
      this.state.mode = RGB
    } else if (exists(obj.h) && exists(obj.s) && exists(obj.l)) {
      this.state.color = Color.ensureHSL(obj.h, obj.s, obj.l)
      this.state.mode = HSL
    }
    if (exists(obj.a)) {
      this.state.alpha = Color.ensureAlpha(obj.a)
    }
  }

  fromArray(arr, type = RGB) {
    if (!Array.isArray(arr)) return
    if (exists(arr[0]) && exists(arr[1]) && exists(arr[2])) {
      if (type === HSL) {
        this.state.color = Color.ensureHSL(arr[0], arr[1], arr[2])
      } else {
        this.state.color = Color.ensureRGB(arr[0], arr[1], arr[2])
      }
      this.state.mode = type
    }
    if (exists(arr[3])) {
      this.state.alpha = Color.ensureAlpha(arr[3])
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
    return this.state.alpha
  }

  get rgb() {
    const rgb = Object.values(this.getRGB()).map(v => Math.round(v)).join(",")
    return `rgb(${rgb})`
  }

  get rgba() {
    const rgb = Object.values(this.getRGB()).map(v => Math.round(v)).join(",")
    return `rgba(${rgb},${this.state.alpha})`
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
    return `hsla(${hsl},${this.state.alpha})`
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
    return Color.reverseNames[hex] || false
  }

  // setters

  set hue(h) {
    const { s, l } = this.getHSL()
    h = Color.ensureHue(h)
    this.state.color = { h, s, l }
    this.state.mode = HSL
  }

  set saturation(s) {
    const { h, l } = this.getHSL()
    s = Color.ensureValue(s, 100)
    this.state.color = { h, s, l }
    this.state.mode = HSL
  }

  set lightness(l) {
    const { h, s } = this.getHSL()
    l = Color.ensureValue(l, 100)
    this.state.color = { h, s, l }
    this.state.mode = HSL
  }

  set red(r) {
    const { g, b } = this.getRGB()
    r = Color.ensureValue(r, 255)
    this.state.color = { r, g, b }
    this.state.mode = RGB
  }

  set green(g) {
    const { r, b } = this.getRGB()
    g = Color.ensureValue(g, 255)
    this.state.color = { r, g, b }
    this.state.mode = RGB
  }

  set blue(b) {
    const { r, g } = this.getRGB()
    b = Color.ensureValue(b, 255)
    this.state.color = { r, g, b }
    this.state.mode = RGB
  }

  set alpha(a) {
    this.state.alpha = Color.ensureAlpha(a)
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

export default Color
