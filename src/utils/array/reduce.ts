import { MaybePromise, AsyncCallback, Settings } from 'types/utils/functions.types';

/**
 * Iterates over an async array and reduces it to a single value using the provided callback function.
 *
 * **Note:** if you want to use `serial` option, the reduction will be performed sequentially.
 *
 * @template T type of element in the array
 * @template U type of the accumulator
 * @param {MaybePromise<T[]>} array - The array or async array to reduce. Auto wait in case of async array.
 * @param {(accumulator: U, currentValue: T, index: number, array: T[]) => MaybePromise<U>} callback -
 * A function that is called for each element of the array,
 * taking the accumulator, current value, current index, and the array as arguments.
 * @param {U} initialValue - The initial value to start the reduction.
 * @param {Settings} [settings] - Optional settings, like `serial`.
 * @returns {Promise<U>} A promise that resolves to the final accumulator value.
 */
export const asyncReduce = async <T, U>(
  array: MaybePromise<readonly T[]>,
  callback: (
    accumulator: U,
    currentValue: T,
    index: number,
    array: readonly T[]
  ) => MaybePromise<U>,
  initialValue: U,
//   settings?: Settings
): Promise<U> => {
  const awaited: readonly T[] = await array;

  //   if (settings?.serial) {
  let accumulator = initialValue;
  for (let i = 0; i < awaited.length; i++) {
    accumulator = await callback(accumulator, awaited[i], i, awaited);
  }
  return accumulator;
  //   }

//   return awaited.reduce(async (accPromise: Promise<Awaited<U>>, curr, index) => {
//     const acc = await accPromise;
//     return callback(acc, curr, index, awaited);
//   }, Promise.resolve(initialValue));
};
