import {
  keys, flip, inc, map, multiply, pipe, reduce, times,
} from 'ramda';

import colorFns from './colorFns';
import {
  getScale,
  cleanDecimals,
  capitalize,
  getNames,
  getFilteredFns,
} from './utils';

const DEFAULT_OPTS = {
  steps: 10,
  includedFns: getNames(colorFns),
  excludedFns: [],
};

export const buildSourceArr = (steps) => {
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

const getVariationsForColor = (colorKey, colorValue, steps, fns = colorFns) => reduce(
  (acc, curr) => {
    const fn = curr.reversed ? flip(curr.fn) : curr.fn;
    const colorVariationKey = `${colorKey}${capitalize(curr.name)}`;
    return {
      ...acc,
      [colorVariationKey]: getVariationValues(fn, colorValue, steps),
    };
  },
  {},
  fns,
);

const generateColors = ({ colors, steps, fns }) => reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: colors[curr],
    ...getVariationsForColor(curr, colors[curr], steps, fns),
  }),
  {},
  keys(colors),
);

const colorExtender = (colors, opts = DEFAULT_OPTS) => {
  const { includedFns, excludedFns, steps } = opts;
  const filteredFns = getFilteredFns({ includedFns, excludedFns })(colorFns);
  return generateColors({ colors, steps, fns: filteredFns });
};

export default colorExtender;
