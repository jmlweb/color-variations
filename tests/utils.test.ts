import {
  capitalize,
  cleanDecimals,
  getNames,
  getScale,
  nameIsIncludedInArr,
  getFilteredFns,
  propIsOfType,
} from '../src/utils';

describe('Utils', () => {
  it('capitalize', () => {
    expect(capitalize('rgba')).toBe('Rgba');
    expect(capitalize('darken')).toBe('Darken');
  });
  it('getScale', () => {
    expect(getScale(10)).toBe(0.1);
    expect(getScale(5)).toBe(0.2);
  });
  it('cleanDecimals', () => {
    expect(cleanDecimals(0.02)).toBe(0.02);
    expect(cleanDecimals(0.020000004)).toBe(0.02);
    expect(cleanDecimals(2 / 100)).toBe(0.02);
  });
  it('getNames', () => {
    expect(getNames([{ name: 'foo', other: 'nope' }, { name: 'bar' }])).toEqual(['foo', 'bar']);
  });
  it('nameIsIncludedInArr', () => {
    expect(nameIsIncludedInArr(['foo'])({ name: 'bar' })).toBe(false);
    expect(nameIsIncludedInArr(['foo'])({ name: 'foo' })).toBe(true);
  });
  it('getFilteredFns', () => {
    expect(
      getFilteredFns({ includedFns: ['rgba', 'darken', 'lighten'], excludedFns: ['rgba'] })([
        {
          name: 'rgba',
        },
        {
          name: 'darken',
        },
        {
          name: 'lighten',
        },
        {
          name: 'excluded1',
        },
        {
          name: 'excluded2',
        },
      ]),
    ).toEqual([
      {
        name: 'darken',
      },
      {
        name: 'lighten',
      },
    ]);
  });
  it('propIsOfType', () => {
    expect(propIsOfType('name', 'String')({ name: 123 })).toBe(false);
    expect(propIsOfType('name', 'String')({ name: [] })).toBe(false);
    expect(propIsOfType('name', 'String')({ name: {} })).toBe(false);
    expect(propIsOfType('name', 'String')({ name: 'foo' })).toBe(true);
    expect(propIsOfType('name', 'Array')({ name: [] })).toBe(true);
    expect(propIsOfType('name', 'Object')({ name: {} })).toBe(true);
  });
});
