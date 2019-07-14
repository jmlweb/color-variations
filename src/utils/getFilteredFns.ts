import { contains, filter, pipe, reject, view, flip } from 'ramda';
import { nameLens } from '../lenses';
import { FnsNames, StringToBoolean, ColorFns } from '../types';

export interface NameIsIncludedInArr {
  (namesArr: FnsNames): StringToBoolean;
}

export const nameIsIncludedInArr: NameIsIncludedInArr = namesArr =>
  pipe(
    view(nameLens),
    flip(contains)(namesArr),
  );
  
const getFilteredFns = ({
  includedFns,
  excludedFns,
}: {
  includedFns: FnsNames;
  excludedFns: FnsNames;
}): any =>
  pipe(
    filter(nameIsIncludedInArr(includedFns)),
    reject(nameIsIncludedInArr(excludedFns)),
  );

export default getFilteredFns;