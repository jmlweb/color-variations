import {
  cond,
  either,
  inc,
  keys,
  map,
  multiply,
  partial,
  pipe,
  reduce,
  T,
  times,
} from 'ramda';

import colorFns from './colorFns';
import {
  getScale,
  cleanDecimals,
  capitalize,
  getNames,
  getFilteredFns,
  prefixKeyIfNeeded,
  extractFnInCorrectOrder,
  valueIsOfType,
} from './utils';

const DEFAULT_OPTS: {
  steps: number,
  includedFns: Array<any>,
  excludedFns: Array<any>
} = {
  steps: 10,
  includedFns: getNames(colorFns),
  excludedFns: [],
};

export const buildSourceArr = (steps: number) => {
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

const getVariationValues = (fn: any, colorValue: string, steps: number) => {
  const partialedFn = partial(fn, [colorValue]);
  const sourceArr = buildSourceArr(steps);
  return map(partialedFn, sourceArr);
};

const getVariationsForColor = (colorKey: string, colorValue: string, steps: number, fns: Array<any>) => {
  const cleanKey = prefixKeyIfNeeded(colorKey);
  return reduce(
    (acc, curr: { name: string }) => {
      const fn = extractFnInCorrectOrder(curr);
      const colorVariationKey = `${cleanKey}${capitalize(curr.name)}`;
      return {
        ...acc,
        [colorVariationKey]: getVariationValues(fn, colorValue, steps),
      };
    },
    {},
    fns,
  );
};

export const generateColor = (props: any) => {
  const generateForString = ({
    name, value, steps, fns,
  }: { name: string, value: string, steps: number, fns: Array<any> }) => ({
    [name]: value,
    ...getVariationsForColor(name, value, steps, fns),
  });

  const generateForOther = ({ name, value }: {  name: string, value: string }) => ({
    [name]: value,
  });

  const generateForObject: any = ({
    name, value, steps, fns,
  }: { name: string, value: string, steps: number, fns: Array<any> }) => ({
    [name]: pipe(
      keys,
      reduce(
        (acc, curr: any) => ({
          ...acc,
          ...generateColor({
            name: curr,
            value: value[curr],
            steps,
            fns,
          }),
        }),
        {},
      ),
    )(value),
  });

  return cond([
    [valueIsOfType('String'), generateForString],
    [either(valueIsOfType('Object'), valueIsOfType('Array')), generateForObject],
    [T, generateForOther],
  ])(props);
};

const generateColors = ({ colors, steps, fns }: { colors: {}, steps: number, fns: Array<any>}) => reduce(
  (acc, curr) => ({
    ...acc,
    ...generateColor({
      name: curr,
      value: colors[curr],
      steps,
      fns,
    }),
  }),
  {},
  keys(colors),
);

const colorExtender = (colors: {}, opts = DEFAULT_OPTS) => {
  const { includedFns, excludedFns, steps } = opts;
  const filteredFns = getFilteredFns({ includedFns, excludedFns })(colorFns);
  return generateColors({ colors, steps, fns: filteredFns });
};

export default colorExtender;