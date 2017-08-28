export function hslToRGB(h, s, l) {
  h /= 360
  s /= 100
  l /= 100
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

export function rgbToHSL(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
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

export function ensureAlpha(a) {
  a = parseFloat(a)
  if (isNaN(a)) return 1
  return Math.max(0, Math.min(1, a))
}

export function ensureHue(h) {
  h = parseInt(h)
  if (isNaN(h)) return 0
  const hue = h % 360
  return hue < 0 ? 360 + hue : hue
}

export function ensureValue(v, max) {
  if (typeof v === "string" && v.indexOf("%") > -1) {
    v = parseInt(v) / 100 * max
  } else {
    v = parseInt(v)
  }
  if (isNaN(v)) return 0
  return Math.max(0, Math.min(max, v))
}

export function ensureHSL(h, s, l) {
  return {
    h: ensureHue(h),
    s: ensureValue(s, 100),
    l: ensureValue(l, 100),
  }
}

export function ensureRGB(r, g, b) {
  return {
    r: ensureValue(r, 255),
    g: ensureValue(g, 255),
    b: ensureValue(b, 255),
  }
}
