const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
const hexShortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i


(function() {

  const Color = {

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
      if (!max) max = this.max()
      return max - Math.min(this._rgb.r, this._rgb.g, this._rgb.b)
    },

    then(handler) {
      // todo: handle in proxy
      this.handler = handler
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
      return Math.round(hue)
    },

    get saturation() {
      const { r, g, b } = this._rgb
      const max = this.max()
      const range = this.range(max)
      const l = max / 255 - range / 510
      const saturation = range === 0 ? 0 : range / 2.55 / (l < 0.5 ? l * 2 : 2 - l * 2)
      return Math.round(saturation)
    },

    get lightness() {
      const max = this.max()
      const range = this.range(max)
      const lightness = max / 255 - range / 510
      return Math.round(100 * lightness)
    },

    get greyscale() {
      const { r, g, b } = this._rgb
      var val = r * 0.3 + g * 0.59 + b * 0.11
      return `rgb(${val},${val},${val})`
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

    get hsl() {
      const { r, g, b } = this._rgb
      const max = this.max()
      const range = this.range(max)
      const l = max / 255 - range / 510
      const s = range === 0 ? 0 : range / 2.55 / (l < 0.5 ? l * 2 : 2 - l * 2)
      const hsl = {
        h: Math.round(this.hue),
        s: Math.round(s),
        l: Math.round(100 * l),
      }
      return `hsl(${Object.values(hsl).join(',')})`
    },

    get hsla() {
      
    }

    get hex() {
      return '#' + Object
        .values(this._rgb)
        .map(v => v.toString(16))
        .map(v => v.length === 2 ? v : '0' + v)
        .join('')
    },

    // setters

    set hue(h) {
      this.hsl = { h, s: this.s, l: this.l }
    },

    set saturation(s) {
      this.hsl = { h: this.h, s, l: this.l }
    },

    set lightness(l) {
      this.hsl = { h: this.h, s: this.s, l }
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

    set alpha(a) {
      this._alpha = Math.max(0, Math.min(1, a))
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

    set hsl({ h, s, l }) {
      h /= 360, s /= 100, l /= 100
      let r, g, b
      if(s == 0){
        r = g = b = l
      } else {
        function hue2rgb(p, q, t){
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1/6) return p + (q - p) * 6 * t
          if (t < 1/2) return q
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
      }
      this._rgb = {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      }
    },

    set hsla({ h, s, l, a }) {
      this.hsl = { h, s, l }
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
    set h(h) { this.hue = h },

    get s() { return this.saturation },
    set s(s) { this.saturation = s },

    get l() { return this.lightness },
    set l(l) { this.lightness = l },

    get r() { return this._rgb.r },
    set r(r) { this.red = r },

    get g() { return this._rgb.g },
    set g(g) { this.green = g },

    get b() { return this._rgb.b },
    set b(b) { this.blue = b },

    get a() { return this._alpha },
    set a(a) { this.alpha = a },

  }

  const validateColor = (type, value) => {
    // todo: validate setters
    return null
  }

  const ColorProxy = new Proxy(Color, {
    set(target, name, value) {
      const err = validateColor(name, value)
      if (!err) {
        target[name] = value
      }
      target.handler && target.handler(target, err)
      return true
    },
  })

  window.Color = ColorProxy

})()