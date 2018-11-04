import expect from 'expect';

import blackResults from './blackResults';
import redResults from './redResults';
import blueResults from './blueResults';
import greenResults from './greenResults';
import colorExtender from '../src';

const black = '#000';
const red = '#ff0000';
const blue = 'rgb(0, 102, 204)';
const green = 'rgba(101, 218, 162, 0.9)';

describe('colorExtender', () => {
  it('black', () => {
    expect(colorExtender({ black })).toEqual(blackResults);
  });
  it('red', () => {
    expect(colorExtender({ red })).toEqual(redResults);
  });
  it('blue', () => {
    expect(colorExtender({ blue })).toEqual(blueResults);
  });
  it('green', () => {
    expect(colorExtender({ green })).toEqual(greenResults);
  });
  it('combined', () => {
    expect(
      colorExtender({
        black,
        red,
        blue,
        green,
      }),
    ).toEqual({
      ...blackResults,
      ...redResults,
      ...blueResults,
      ...greenResults,
    });
  });
});
