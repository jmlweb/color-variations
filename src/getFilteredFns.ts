import { filter, pipe, reject, view } from 'ramda';
import { nameLens } from './lenses';
import { FnsNames, StringToBoolean, ColorFns } from './types';
import { reversedContains } from './utils';

export const nameIsIncludedInArr = (namesArr: FnsNames): StringToBoolean =>
  pipe(
    view(nameLens),
    reversedContains(namesArr),
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