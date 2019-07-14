import colorVariations from './index';

import { blackResults, blueResults } from '../testsUtils/index';

const black = '#000';
const blue = 'rgb(0, 102, 204)';

describe('colorVariations', () => {
  it('Hex black', () => {
    expect(colorVariations({ black })).toEqual(blackResults);
  });
  it('rgb blue', () => {
    expect(colorVariations({ blue })).toEqual(blueResults);
  });
})