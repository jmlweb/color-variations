import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import saturate from 'polished/lib/color/saturate';
import desaturate from 'polished/lib/color/desaturate';
import rgba from 'polished/lib/color/rgba';
import shade from 'polished/lib/color/shade';
import tint from 'polished/lib/color/tint';

const colorFns = [
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

export default colorFns;
