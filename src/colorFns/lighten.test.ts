import lighten from './lighten';

describe('lighten', () => {
  test('lighten', () => {
    expect(lighten('#000000', 0.5)).toBe('#808080');
  })
});