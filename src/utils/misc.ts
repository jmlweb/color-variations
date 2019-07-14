import {
  both,
  concat,
  converge,
  curry,
  divide,
  head,
  is,
  length,
  lt,
  pipe,
  propIs,
  tail,
  toUpper,
  when,
  __,
} from 'ramda';
import {
  Constructor,
  NumberToNumber,
  StringToString,
} from '../types';

export const toFixed: Function = curry(
  (x: number | 0, v: number | 0): string => v.toFixed(x),
);

export const cleanDecimals: NumberToNumber = pipe(
  toFixed(2),
  parseFloat,
);

const capitalizeFn: StringToString = converge(concat, [
  pipe(
    head,
    toUpper,
  ),
  tail,
]);

export const capitalize: StringToString = when(
  both(
    is(String),
    pipe(
      length,
      lt(1),
    ),
  ),
  capitalizeFn,
);

export interface PropValueIsOfType {
  (x: {}): boolean;
}

export interface ValueIs {
  (type: Constructor): PropValueIsOfType;
}

export const valueIs: ValueIs = type => propIs(type, 'value');

export const buildScaleForSteps: NumberToNumber = pipe(
  divide(100),
  divide(__, 100),
);
