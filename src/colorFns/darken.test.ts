import darken from './darken';

describe('darken', () => {
  test('darken', () => {
    expect(darken('#ffffff', 0.5)).toBe('#808080');
  })
});