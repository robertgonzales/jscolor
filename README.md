# jscolor

Super simple color manipulation using getters and setters

Install:
```js
npm install --save jscolor
```

Usage:
```js
import Color from 'jscolor'

let c = new Color('#483d8b')
```

Read color values without any extra work:
```js
c.r           // => 72
c.g           // => 61
c.b           // => 139
c.a           // => 1
c.red         // => 72
c.green       // => 61
c.blue        // => 139
c.alpha       // => 1
c.rgb         // => 'rgb(72,61,139)'
c.rgba        // => 'rgba(72,61,139,1)'
c.h           // => 248
c.s           // => 39
c.l           // => 39
c.hue         // => 248
c.saturation  // => 39
c.lightness   // => 39
c.hsl         // => hsl(248,39%,39%)
c.hsla        // => hsla(248,39%,39%,1)
c.hex         // => '#483d8b'
c.yiq         // => 73.181
c.name        // => 'darkslateblue'
```

Manipulate colors using normal operators:
```js
c.r = 100
c.rgb         // => 'rgb(100,61,139)'
c.hex         // => '#643d8b'

c.hue += 180
c.rgb         // => 'rgb(129,139,61)'
c.hex         // => '#648b3d'

c.rgb = 'rgb(150,170,180)'
c.hsl         // => 'hsl(200,17%,65%)'
c.hex         // => '#96aab4'
```
