import { getNames } from './colorFns';

describe('colorFns', () => {
  test('getNames', () => {
    const darken = jest.fn();
    const lighten = jest.fn();
    expect(getNames([{ name: 'darken', fn: darken }, { name: 'lighten', fn: lighten }])).toEqual([
      'darken',
      'lighten',
    ]);
  });
});
