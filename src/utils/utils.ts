import { Locator } from '@playwright/test';
import { IWaitUntilOptions } from '../types/core/actions.types';
import { TIMEOUT_10_SEC } from './timeouts';
import { isLocator } from './typeGuards/selector';

export const delay = async (timeout: number) =>
  new Promise((resolve) => { setTimeout(resolve, timeout); });

export const waitUntil = async (condition: () => Promise<boolean>,
  options?: IWaitUntilOptions) => {
  const interval = options?.interval ?? 500;
  const timeout = options?.timeout || TIMEOUT_10_SEC;
  const timeoutMessage = options?.timeoutMsg
    || 'Condition not met within the specified timeout.';
  let elapsedTime = 0;

  while (elapsedTime < timeout) {
    if (await condition()) {
      return;
    }

    await delay(interval);
    elapsedTime += interval;
  }

  throw new Error(timeoutMessage);
};

export const capitalize = (word: string) =>
  word.slice(0, 1).toUpperCase() + word.slice(1);

const pickFunc = <T extends {}, K extends keyof T>(
  obj: T,
  predicate: (k: string) => boolean,
): Pick<T, K> => Object.keys(obj)
    .filter(predicate)
    .reduce((filteredObj: Pick<T, K>, key) => (
      { ...filteredObj, [key]: obj[key as keyof T] }
    ), {} as Pick<T, K>);
/**
 * Creates an object composed of the picked `object` properties.
 *
 * @param {Object} object The source object.
 * @param {...(string|string[])} keys The properties to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
export const pick = <T extends {}, K extends keyof T>
  (object: T, keys: K[] | K): Pick<T, K> =>
    pickFunc(object, (k) => (Array.isArray(keys)
      ? keys : [keys]).includes(k as K));
/**
 * The opposite of `pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @param {Object} object The source object.
 * @param {...(string|string[])} keys The properties to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
export const omit = <T extends {}, K extends keyof T>
  (object: T, keys: K[]): Pick<T, K> =>
    pickFunc(object, (k) => !(Array.isArray(keys)
      ? keys : [keys]).includes(k as K));

export const getElementSelector = (item: Locator | string) => {
  if (isLocator(item)) {
    return item._selector;
  }
  return item;
};

export const sortById = <T extends { _id: string }>(array: T[]) =>
  array.slice().sort((a, b) => {
    if (a._id.toLowerCase() < b._id.toLowerCase()) return -1;
    if (a._id.toLowerCase() < b._id.toLowerCase()) return 1;
    return 0;
  });

export const convertToBearer = (str: string) => `Bearer ${str}`;
