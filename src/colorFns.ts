import {
  darken,
  lighten,
  saturate,
  desaturate,
  rgba,
  shade,
  tint
} from "polished";

const colorFns: Array<{ fn: Function, name: string, reversed: Boolean }> = [
  {
    fn: rgba,
    name: "rgba",
    reversed: false
  },
  {
    fn: darken,
    name: "darken",
    reversed: true
  },
  {
    fn: lighten,
    name: "lighten",
    reversed: true
  },
  {
    fn: saturate,
    name: "saturate",
    reversed: true
  },
  {
    fn: desaturate,
    name: "desaturate",
    reversed: true
  },
  {
    fn: shade,
    name: "shade",
    reversed: true
  },
  {
    fn: tint,
    name: "tint",
    reversed: true
  }
];

export default colorFns;
