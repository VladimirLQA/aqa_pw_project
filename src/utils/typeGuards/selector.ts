import { type Locator } from '@playwright/test';

export const isLocator =
  (selectorOrLocator: string | Locator): selectorOrLocator is Locator =>
    typeof selectorOrLocator !== 'string';

export const isLocatorArray =
(selectorOrLocator: string | Locator[]): selectorOrLocator is Locator[] =>
  Array.isArray(selectorOrLocator) && selectorOrLocator.every((el) => typeof el !== 'string');
