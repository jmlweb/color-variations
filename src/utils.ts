import {
  Lens,
  concat,
  cond,
  contains,
  divide,
  equals,
  filter,
  flip,
  head,
  identity,
  ifElse,
  lensProp,
  map,
  partial,
  pipe,
  prop,
  reject,
  T,
  tail,
  toUpper,
  type,
  view
} from "ramda";

const nameLens: Lens = lensProp("name");

export const capitalize = (str: string) => `${toUpper(head(str))}${tail(str)}`;

export const reversedDivide = flip(divide);

export const reversedContains = flip(contains);

export const getScale = pipe(
  divide(100),
  reversedDivide(100)
);

export const cleanDecimals = pipe(
  (v: number) => v.toFixed(2),
  parseFloat
);

export const getNames = map(view(nameLens));

export const nameIsIncludedInArr = (namesArr: Array<string>) =>
  pipe(
    view(nameLens),
    reversedContains(namesArr)
  );

export const getFilteredFns: Function = ({
  includedFns,
  excludedFns
}: {
  includedFns: Array<string>;
  excludedFns: Array<string>;
}) =>
  pipe(
    filter(nameIsIncludedInArr(includedFns)),
    reject(nameIsIncludedInArr(excludedFns))
  );

export const propIsOfType = (name: string, typeSearched: string) =>
  pipe(
    prop(name),
    type,
    equals(typeSearched)
  );

export const prefixKeyIfNeeded = cond([
  [
    pipe(
      parseFloat,
      Number.isNaN
    ),
    identity
  ],
  [T, concat("c")]
]);

export const extractFnInCorrectOrder = ifElse(
  prop("reversed"),
  pipe(
    prop("fn"),
    flip
  ),
  prop("fn")
);

export const valueIsOfType = partial(propIsOfType, ["value"]);
