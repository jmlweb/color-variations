import {
  capitalize,
  toFixed,
  propIs,
} from '../src/utils';

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
  test('propIs', () => {
    expect(propIs('name', String)({ name: 123 })).toBe(false);
    expect(propIs('name', String)({ name: [] })).toBe(false);
    expect(propIs('name', String)({ name: {} })).toBe(false);
    expect(propIs('name', String)({ name: 'foo' })).toBe(true);
    expect(propIs('name', Array)({ name: [] })).toBe(true);
    expect(propIs('name', Object)({ name: {} })).toBe(true);
  });
});