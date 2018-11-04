# color-variations

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

Create color variations for your theme with no pain.

## Install

`yarn add color-variations`

or

`npm install color-variations`

## Use

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
