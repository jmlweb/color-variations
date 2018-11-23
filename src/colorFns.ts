import {
  darken,
  desaturate,
  lighten,
  rgba,
  saturate,
  shade,
  tint,
} from 'polished';
import { map, view } from 'ramda';
import { nameLens } from './lenses';
import { ColorFns, ColorFnsToFnsNames, FnsNames } from './types';

export const getNames: ColorFnsToFnsNames = map(view(nameLens));

const colorFns: ColorFns = [
  {
    fn: rgba,
    name: 'rgba',
    reversed: false,
  },
  {
    fn: darken,
    name: 'darken',
    reversed: true,
  },
  {
    fn: lighten,
    name: 'lighten',
    reversed: true,
  },
  {
    fn: saturate,
    name: 'saturate',
    reversed: true,
  },
  {
    fn: desaturate,
    name: 'desaturate',
    reversed: true,
  },
  {
    fn: shade,
    name: 'shade',
    reversed: true,
  },
  {
    fn: tint,
    name: 'tint',
    reversed: true,
  },
];

export const colorFnsNames: FnsNames = getNames(colorFns);

export default colorFns;
