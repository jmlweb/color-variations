import { identity } from 'ramda';
import generateFn from './generateFn';

const rgba = generateFn('setAlpha', identity);

export default rgba;