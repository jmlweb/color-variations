import saturate from './saturate';

describe('saturate', () => {
  test('saturate', () => {
    expect(saturate('#ccc', 1)).toBe('#ff9999');
  });
});