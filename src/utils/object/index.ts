import { hideSecretData } from '../string/index';

export const updateValueInObject =
  (obj: any, keyToFind: string, newValue: Function) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If the current property is an object, recursively search inside it
        updateValueInObject(obj[key], keyToFind, newValue);
      } else if (key === keyToFind) {
      // If the key matches, update its value
        typeof newValue === 'function' ? (obj[key] = newValue(obj[key])) : (obj[key] = newValue);
      }
    }
  };

export const hideValueInObject = (obj: object, keyToFind: string) =>
  updateValueInObject(obj, keyToFind, hideSecretData);

export const getRandomObjectValue =
  <T>(object: T, random = Math.random) => {
    const values = Object.values(object as object);
    const randomIdx = Math.floor(random() * values.length);
    return values[randomIdx];
  };
