import expect from 'expect';

import blackResults from './blackResults';
import redResults from './redResults';
import blueResults from './blueResults';
import greenResults from './greenResults';
import grayResults from './grayResults';
import grayArrResults from './grayArrResults';
import colorExtender, { buildSourceArr, generateColor } from '../src';
import colorFns from '../src/colorFns';

const black = '#000';
const red = '#ff0000';
const blue = 'rgb(0, 102, 204)';
const green = 'rgba(101, 218, 162, 0.9)';

describe('colorExtender', () => {
  it('buildSourceArr', () => {
    expect(buildSourceArr(10)).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });
  it('generateColor', () => {
    expect(
      generateColor({
        name: 'black',
        value: '#000',
        steps: 10,
        fns: [colorFns[0]],
      }),
    ).toEqual({
      black: '#000',
      blackRgba: blackResults.blackRgba,
    });
    expect(
      generateColor({
        name: 'gray',
        value: { light: '#ccc', dark: { sm: '#999', lg: '#333' } },
        steps: 10,
        fns: [colorFns[0]],
      }),
    ).toEqual(grayResults);
    expect(
      generateColor({
        name: 'gray',
        value: ['#ccc', '#999', '#333'],
        steps: 10,
        fns: [colorFns[0]],
      }),
    ).toEqual(grayArrResults);
  });
  it('colorExtender', () => {
    expect(colorExtender({ black })).toEqual(blackResults);
    expect(colorExtender({ red })).toEqual(redResults);
    expect(colorExtender({ blue })).toEqual(blueResults);
    expect(colorExtender({ green })).toEqual(greenResults);
    expect(
      colorExtender({
        black,
        red,
        blue,
        green,
        mainGradient: {
          red,
          green,
          foo: {
            blue,
          },
        },
      }),
    ).toEqual({
      ...blackResults,
      ...redResults,
      ...blueResults,
      ...greenResults,
      mainGradient: {
        ...redResults,
        ...greenResults,
        foo: {
          ...blueResults,
        },
      },
    });
  });
});
