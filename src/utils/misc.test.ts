import {
  capitalize,
  toFixed,
} from './misc';

describe('Utils', () => {
  test('capitalize', () => {
    expect(capitalize('rgba')).toBe('Rgba');
    expect(capitalize('darken')).toBe('Darken');
    expect(capitalize('')).toBe('');
  });
  test('toFixed', () => {
    expect(toFixed(2, 0.666666)).toBe('0.67');
    expect(toFixed(2)(0.666666)).toBe('0.67');
  });
});