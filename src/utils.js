import {
  divide,
  flip,
  head,
  pipe,
  tail,
  toUpper,
} from 'ramda';

export const capitalize = str => `${toUpper(head(str))}${tail(str)}`;

export const reversedDivide = flip(divide);

export const getScale = pipe(
  divide(100),
  reversedDivide(100),
);

export const cleanDecimals = pipe(
  v => v.toFixed(2),
  parseFloat,
);
