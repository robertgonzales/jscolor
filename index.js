const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
const hexShortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i


Color = {

  // private

  _rgb: {
    r: 0,
    g: 0,
    b: 0,
  },
  _alpha: 1,

  // helpers

  max() {
    return Math.max(this._rgb.r, this._rgb.g, this._rgb.b)
  },

  range(max) {
    const maximum = max ? max : this.max()
    return maximum - Math.min(this._rgb.r, this._rgb.g, this._rgb.b)
  },

  // getters

  get hue() {
    const max = this.max()
    const range = this.range(max)
    const { r, g, b } = this._rgb
    let hue
    if (range === 0) {
      hue = 0
    } else {
      switch (max) {
        case r:
          hue = (g - b) / range * 60
          if (hue < 0) hue += 360
          break
        case g:
          hue = (b - r) / range * 60 + 120
          break
        case b:
          hue = (r - g) / range * 60 + 240
          break
      }
    }
    return hue
  },

  get red() {
    return this._rgb.r
  },

  get green() {
    return this._rgb.g
  },

  get blue() {
    return this._rgb.b
  },

  get alpha() {
    return this._alpha
  },

  get rgb() {
    return `rgb(${Object.values(this._rgb).join(',')})`
  },

  get rgba() {
    return `rgba(${Object.values(this._rgb).join(',')},${this._alpha})`
  },

  get hsv() {
    const { _rgb, _alpha } = this
    const max = this.max()
    const range = this.range()
    return {
      h: this.hue,
      s: (max == 0 ? 0 : 100 * range / max),
      v: max / 2.55,
    }
  },

  get hex() {
    return '#' + Object
      .values(this._rgb)
      .map(v => v.toString(16))
      .map(v => v.length === 2 ? v : '0' + v)
      .join('')
  },

  // setters

  set hue(h) {

  },

  set saturation(s) {

  },

  set value(v) {

  },

  set alpha(a) {
    this._alpha = Math.max(0, Math.min(1, a))
  },

  set red(r) {
    this._rgb.r = Math.max(0, Math.min(255, r))
  },

  set green(g) {
    this._rgb.g = Math.max(0, Math.min(255, g))
  },

  set blue(b) {
    this._rgb.b = Math.max(0, Math.min(255, b))
  },

  set rgb({ r, g, b }) {
    this.red = r
    this.green = g
    this.blue = b
  },

  set rgba({ r, g, b, a }) {
    this.rgb = { r, g, b }
    this.alpha = a
  },

  set hsva({ h, s, v }) {
    if (s === 0) {
      this._rgb = { r: v, g: v, b: v }
    } else {
      var f  = h / 60 - Math.floor(h / 60)
      var p  = v * (1 - s / 100)
      var q  = v * (1 - s / 100 * f)
      var t  = v * (1 - s / 100 * (1 - f))
      switch (Math.floor(h / 60)){
        case 0: var r = v; var g = t; var b = p; break;
        case 1: var r = q; var g = v; var b = p; break;
        case 2: var r = p; var g = v; var b = t; break;
        case 3: var r = p; var g = q; var b = v; break;
        case 4: var r = t; var g = p; var b = v; break;
        case 5: var r = v; var g = p; var b = q; break;
      }
    }
    this._rgb = {
      r: Math.round(r * 2.55),
      g: Math.round(g * 2.55),
      b: Math.round(b * 2.55),
    }
  },

  set hsva({ h, s, v, a }) {
    this.hsv = { h, s, v }
    this.alpha = a
  },

  set hex(str) {
    const hex = str.replace(hexShortRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = hexRegex.exec(hex)
    this._rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
  },

  // aliases

  get h() { return this.hue },

  get s() { return this.saturation },

  get v() { return this.value },

  get l() { return this.luminosity },

  get r() { return this._rgb.r },

  get g() { return this._rgb.g },

  get b() { return this._rgb.b },

  get a() { return this._alpha },


  set h(h) { this.hue = h },

  set s(s) { this.saturation = s },

  set v(v) { this.value = v },

  set r(r) { this.alpha = r },

  set g(g) { this.green = g },

  set b(b) { this.blue = b },

  set a(a) { this.alpha = a },

}


window.Color = Color