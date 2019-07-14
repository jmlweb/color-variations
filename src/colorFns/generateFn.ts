import { always, equals, ifElse, multiply, invoker } from 'ramda';
import tinycolor from 'tinycolor2';

export interface Multiply {
  (x: number): number,
}

export interface GeneratedFunction {
  (x: string, y: number): string,
}

export interface SourceFunction {
  (x: string, y?: Function): GeneratedFunction,
}

export const multiplyBy100: Multiply = multiply(100);

export const getType = ifElse(
  equals('setAlpha'),
  always('rgb'),
  always('hex'),
)

export const generateFn: SourceFunction = (fnName, valueTransform = multiplyBy100) => (
  color,
  value,
) => {
  const type = getType(fnName);
  const transformedValue: number = valueTransform(value);
  const colorObj = tinycolor(color);
  const transformedColorObj = invoker(1, fnName)(transformedValue, colorObj);
  return invoker(1, 'toString')(type, transformedColorObj);
}
export default generateFn;
