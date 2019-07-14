import shade from './shade';

describe('shade', () => {
  test('shade', () => {
    expect(shade('#ff0000', 0.5)).toBe('#800000');
  });
})