import tinycolor from 'tinycolor2';

export interface GeneratedFunction {
  (color: string, value: number): string;
}

export interface SourceFunction {
  (mixedColor: string): GeneratedFunction;
}

const generateMixFn: SourceFunction = mixedColor => (color, value) =>
  tinycolor.mix(color, mixedColor, value * 100).toString('hex');

export default generateMixFn;
