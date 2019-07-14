import desaturate from './desaturate';

describe('desaturate', () => {
  test('desaturate', () => {
    expect(desaturate('#ff0000', 1)).toBe('#808080');
  });
});