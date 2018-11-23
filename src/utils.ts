import {
  both,
  concat,
  contains,
  converge,
  curry,
  divide,
  flip,
  head,
  is,
  length,
  lt,
  partial,
  pipe,
  prop,
  tail,
  toUpper,
  when,
} from 'ramda';
import {
  Constructor,
  ConstructorToObjectToBoolean,
  NumberToNumberFn,
  ObjectToBoolean,
  StringToStringFn,
} from './types';

export const reversedDivide: Function = flip(divide);
export const reversedContains: Function = flip(contains);

export const toFixed: Function = curry(
  (x: number | 0, v: number | 0): string => v.toFixed(x),
);

export const cleanDecimals: NumberToNumberFn = pipe(
  toFixed(2),
  parseFloat,
);

const capitalizeFn: StringToStringFn = converge(concat, [
  pipe(
    head,
    toUpper,
  ),
  tail,
]);

export const capitalize: StringToStringFn = when(
  both(
    is(String),
    pipe(
      length,
      lt(1),
    ),
  ),
  capitalizeFn,
);

export const propIs = (
  name: string,
  typeSearched: Constructor,
): ObjectToBoolean =>
  pipe(
    prop(name),
    is(typeSearched),
  );

export const valueIs: ConstructorToObjectToBoolean = partial(propIs, ['value']);

export const buildScaleForSteps: NumberToNumberFn = pipe(
  divide(100),
  reversedDivide(100),
);
