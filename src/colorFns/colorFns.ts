import { map, view } from 'ramda';
import { nameLens } from '../lenses';
import darken from './darken';
import desaturate from './desaturate';
import rgba from './rgba';
import lighten from './lighten';
import saturate from './saturate';
import shade from './shade';
import tint from './tint';
import { FnsNames, ColorFns } from '../types';

export interface GetNames {
  (colorFns: ColorFns): FnsNames
}

export const getNames: GetNames = map(view(nameLens));

const colorFns: ColorFns = [
  {
    fn: rgba,
    name: 'rgba',
  },
  {
    fn: darken,
    name: 'darken',
  },
  {
    fn: lighten,
    name: 'lighten',
  },
  {
    fn: saturate,
    name: 'saturate',
  },
  {
    fn: desaturate,
    name: 'desaturate',
  },
  {
    fn: shade,
    name: 'shade',
  },
  {
    fn: tint,
    name: 'tint',
  },
];

export const colorFnsNames = getNames(colorFns);

export default colorFns;
