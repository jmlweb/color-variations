import {
  keys,
  flip,
  inc,
  map,
  multiply,
  pipe,
  reduce,
  times,
} from 'ramda';

import colorFns from './colorFns';

import { getScale, cleanDecimals, capitalize } from './utils';

const buildSourceArr = (steps) => {
  const scale = getScale(steps);
  return pipe(
    inc,
    times(
      pipe(
        multiply(scale),
        cleanDecimals,
      ),
    ),
  )(steps);
};

const getVariationValues = (fn, colorValue, steps) => {
  const sourceArr = buildSourceArr(steps);
  return map(v => fn(colorValue, v), sourceArr);
};

const getVariationsForColor = (colorKey, colorValue, steps) => reduce(
  (acc, curr) => {
    const fn = curr.reversed ? flip(curr.fn) : curr.fn;
    const colorVariationKey = `${colorKey}${capitalize(curr.name)}`;
    return {
      ...acc,
      [colorVariationKey]: getVariationValues(fn, colorValue, steps),
    };
  },
  {},
  colorFns,
);

const colorExtender = (colors, opts = { steps: 10 }) => reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: colors[curr],
    ...getVariationsForColor(curr, colors[curr], opts.steps),
  }),
  {},
  keys(colors),
);

export default colorExtender;
