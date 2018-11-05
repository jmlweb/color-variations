# color-variations

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/jmlweb/color-variations/master.png?style=flat-square
[build]: https://travis-ci.org/jmlweb/color-variations

[npm-badge]: https://img.shields.io/npm/v/color-variations.png?style=flat-square
[npm]: https://www.npmjs.org/package/color-variations

[coveralls-badge]: https://img.shields.io/coveralls/jmlweb/color-variations/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/jmlweb/color-variations

Create color variations for your theme with no pain.

Based on [polished](https://polished.js.org) color transformation functions.

## Getting started

#### ES6

```js
import colorVariations from 'color-variations';

const baseColors = {
  black: '#000',
  white: '#fff',
  red: '#ff0000',
  blue: 'rgb(0, 102, 204)',
  green: 'rgba(101, 218, 162, 0.9)',
};

const colors = colorVariations(baseColors);

console.log(colors.blackLighten[3]); // '#4d4d4d'
console.log(colors.redTint[3]); // '#ff4c4c'
console.log(colors.greenSaturate[3]); // 'rgba(72,247,163,0.9)'
```

#### node

```js
const colorVariations = require('color-variations');

//... The same as above
```

#### browser

```html
<!-- Inject this script in your HTML -->
<script src="https://unpkg.com/color-variations/umd/color-variations.min.js"></script>
```

The variable exported is called `colorVariations`.

## Installing

`yarn add color-variations`

or

`npm install color-variations`

## Options

#### steps

Defines the number of variations (apart from 0) generated.

For 10 steps the scale will be `[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]`.

For 5 steps `[0, 0.2, 0.4, 0.6, 0.8, 1]`.

Pass the options as an object for the second argument of `colorVariations`.

### includedFns

The color functions included (all by default)

### excludedFns

The color functions excluded (no one by default)

```js
const baseColors = {
  black: '#000',
  red: '#ff0000',
  // ...
};

const opts = {
  steps: 10,
};

const colors = colorVariations(baseColors, opts);
```

## Todo

- [x] Proper documentation
- [x] Human testing
- [x] Improve options (include only functions provided, exclude functions provided...)
- [ ] Support for complex structures (objects of arrays of objects of...)
- [ ] Move away from polished
- [ ] Deal with collisions (having a color with name equals to a generated variation)
- [ ] Exclude useless color variations like darken for black (with option)
- [ ] Options (path) for included/excluded colors for variations
- [ ] Custom variations