import {
  darken,
  desaturate,
  lighten,
  rgba,
  saturate,
  shade,
  tint,
} from 'polished';

export type Fn =
  | darken
  | desaturate
  | lighten
  | rgba
  | saturate
  | shade
  | tint
  | rgba;
export type FnStr =
  | 'darken'
  | 'desaturate'
  | 'lighten'
  | 'saturate'
  | 'shade'
  | 'tint'
  | 'rgba';

export type Constructor =
  | StringConstructor
  | ArrayConstructor
  | ObjectConstructor;

export interface ColorFn {
  readonly fn: Fn;
  readonly name: string;
  readonly reversed?: boolean;
}
export type ColorFns = ReadonlyArray<ColorFn>;

export type FnsNames = ReadonlyArray<FnStr>;

export interface Params {
  readonly name: string;
  readonly value: any;
  readonly steps: number;
  readonly fns: ReadonlyArray<ColorFn>;
}

export interface ParamsString extends Params {
  readonly value: string;
}

export interface StringToStringFn {
  (x: string): string;
}

export interface ColorFnToFn {
  (x: ColorFn): Function;
}

export interface NumberToNumberFn {
  (x: number): number;
}

export interface NumberToString {
  (x: number): string;
}

export interface ColorFnsToFnsNames {
  (x: ColorFns): FnsNames;
}

export interface ObjectToBoolean {
  (x: object): boolean;
}

export interface ConstructorToObjectToBoolean {
  (x: Constructor): ObjectToBoolean;
}

export interface StringToBoolean {
  (x: string): boolean;
}
