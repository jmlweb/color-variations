import rgba from './rgba';

describe('rgba', () => {
  test('hex', () => {
    expect(rgba('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });
})