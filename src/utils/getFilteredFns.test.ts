import getFilteredFns from './getFilteredFns';

const content = [
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
];

describe('getFilteredFns', () => {
  test('with content', () => {
    expect(
      getFilteredFns({
        includedFns: ['rgba', 'darken', 'lighten'],
        excludedFns: ['rgba'],
      })(content),
    ).toEqual([
      {
        name: 'darken',
      },
      {
        name: 'lighten',
      },
    ]);
  });
  test('without included', () => {
    expect(
      getFilteredFns({ includedFns: [], excludedFns: ['rgba'] })(content),
    ).toEqual([]);
  });
  test('with all excluded', () => {
    expect(
      getFilteredFns({
        includedFns: ['rgba', 'darken', 'lighten'],
        excludedFns: ['rgba', 'darken', 'lighten'],
      })(content),
    ).toEqual([]);
  });
  test('without content', () => {
    expect(
      getFilteredFns({
        includedFns: ['rgba', 'darken', 'lighten'],
        excludedFns: ['rgba'],
      })([]),
    ).toEqual([]);
  });
});
