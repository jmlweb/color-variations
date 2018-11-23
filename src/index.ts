import colorFns, { colorFnsNames } from './colorFns';
import getFilteredFns from './getFilteredFns';
import generateVariations from './generateVariations';
import { FnStr } from './types';

const DEFAULT_OPTS: {
  steps: number,
  includedFns: ReadonlyArray<FnStr>,
  excludedFns: ReadonlyArray<FnStr>
} = {
  steps: 10,
  includedFns: colorFnsNames,
  excludedFns: [],
};

const colorVariations = (colors: {}, opts = DEFAULT_OPTS) => {
  const { includedFns, excludedFns, steps } = opts;
  const filteredFns = getFilteredFns({ includedFns, excludedFns })(colorFns);
  return generateVariations({ colors, steps, fns: filteredFns });
};

export default colorVariations;