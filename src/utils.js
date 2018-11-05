import {
  contains,
  divide,
  flip,
  head,
  pipe,
  tail,
  toUpper,
  map,
  view,
  lensProp,
  filter,
  reject,
} from 'ramda';

const nameLens = lensProp('name');

export const capitalize = str => `${toUpper(head(str))}${tail(str)}`;

export const reversedDivide = flip(divide);

export const reversedContains = flip(contains);

export const getScale = pipe(
  divide(100),
  reversedDivide(100),
);

export const cleanDecimals = pipe(
  v => v.toFixed(2),
  parseFloat,
);

export const getNames = map(view(nameLens));

export const nameIsIncludedInArr = namesArr => pipe(
  view(nameLens),
  reversedContains(namesArr),
);

export const getFilteredFns = ({ includedFns, excludedFns }) => pipe(
  filter(nameIsIncludedInArr(includedFns)),
  reject(nameIsIncludedInArr(excludedFns)),
);
