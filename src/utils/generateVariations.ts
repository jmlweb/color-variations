import {
  concat,
  cond,
  either,
  flip,
  identity,
  ifElse,
  inc,
  keys,
  map,
  merge,
  multiply,
  objOf,
  partial,
  pipe,
  prop,
  reduce,
  T,
  times,
} from 'ramda';
import {
  ColorFn,
  ColorFns,
  ColorFnToFn,
  StringToString,
  NumberToString,
  Fn,
} from '../types';
import {
  buildScaleForSteps,
  capitalize,
  cleanDecimals,
  valueIs,
} from './misc';

export const extractFnInCorrectOrder: ColorFnToFn = ifElse(
  prop('reversed'),
  pipe(
    prop('fn'),
    flip,
  ),
  prop('fn'),
);

export const prefixKeyIfNeeded: StringToString = cond([
  [
    pipe(
      parseFloat,
      Number.isNaN,
    ),
    identity,
  ],
  [T, concat('c')],
]);

export const buildSourceArr = (steps: number): ReadonlyArray<number> => {
  const scale = buildScaleForSteps(steps);
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

const getVariationValues = (
  fn: Fn,
  colorValue: string,
  steps: number,
): ReadonlyArray<string > => {
  const sourceArr: ReadonlyArray<number> = buildSourceArr(steps);
  const partialedFn: NumberToString = partial(fn, [colorValue]);
  return map(partialedFn, sourceArr);
};

const getVariationsForColor = (
  colorKey: string,
  colorValue: string,
  steps: number,
  fns: ColorFns,
): { [propName: string]: string } => {
  const cleanKey = prefixKeyIfNeeded(colorKey);
  return reduce(
    (acc: {}, curr: ColorFn) => {
      const fn = extractFnInCorrectOrder(curr);
      const colorVariationKey = concat(cleanKey, capitalize(curr.name));
      return merge(
        acc,
        objOf(colorVariationKey, getVariationValues(fn, colorValue, steps)),
      );
    },
    {},
    fns,
  );
};

interface Params {
  readonly name: string;
  readonly value: any;
  readonly steps: number;
  readonly fns: ReadonlyArray<ColorFn>;
}

interface ParamsString extends Params {
  readonly value: string;
}

export const generateColorVariations = (
  props: Params,
): { [propName: string]: any } => {
  const generateForString = ({
    name,
    value,
    steps,
    fns,
  }: ParamsString): { [propName: string]: string } =>
    merge(objOf(name, value), getVariationsForColor(name, value, steps, fns));

  const generateForOther = ({
    name,
    value,
  }: {
    name: string;
    value: any;
  }): { [propName: string]: any } => objOf(name, value);

  const generateForObject = ({
    name,
    value,
    steps,
    fns,
  }: Params): { [propName: string]: object } =>
    objOf(
      name,
      pipe(
        keys,
        reduce(
          (acc: object, curr: string): object =>
            merge(
              acc,
              generateColorVariations({
                name: curr,
                value: prop(curr, value),
                steps,
                fns,
              }),
            ),
          {},
        ),
      )(value),
    );

  return cond([
    [valueIs(String), generateForString],
    [either(valueIs(Object), valueIs(Array)), generateForObject],
    [T, generateForOther],
  ])(props);
};

const generateVariations = ({
  colors,
  steps,
  fns,
}: {
  colors: {
    [propName: string]: any;
  };
  steps: number;
  fns: ColorFns;
}) =>
  reduce(
    (
      acc: {
        [propName: string]: any;
      },
      curr: string,
    ) =>
      merge(
        acc,
        generateColorVariations({
          name: curr,
          value: prop(curr, colors),
          steps,
          fns,
        }),
      ),
    {},
    keys(colors),
  );

export default generateVariations;
