
import { expect as baseExpect } from '@playwright/test';
export { test } from '@playwright/test';
import type { Locator, TestInfoError } from '@playwright/test';
import { inputBorderColor } from '../data/input-fields';

interface MatcherResult {
	actual?: unknown;
	expected?: unknown;
	message?: string;
}

interface MatcherError extends TestInfoError {
	matcherResult: MatcherResult;
}

const isMatcherError = (error: unknown): error is MatcherError =>
  typeof error === 'object' &&
	error !== null &&
	'matcherResult' in error &&
	typeof error.matcherResult === 'object' &&
	error.matcherResult !== null &&
	'actual' in error.matcherResult;

export const expect = baseExpect.extend({
  async toHaveBorder(locator: Locator, expected: 'valid' | 'invalid', options?: { timeout?: number }) {
    const assertionName = 'toHaveBorder';
    let pass: boolean;
    let matcherResult: MatcherResult | undefined;
    const borderColor = expected === 'valid' ? inputBorderColor.valid : inputBorderColor.inValid;
    try {
      await baseExpect(locator).toHaveCSS('border-color', borderColor, options);
      pass = true;
    } catch (e: unknown) {
      if (isMatcherError(e)) {
        matcherResult = e.matcherResult;
      }
      pass = false;
    }

    const message = pass
      ? () =>
        this.utils.matcherHint(assertionName, undefined, undefined, {
          isNot: this.isNot,
        }) +
					'\n\n' +
					`Locator: ${locator}\n` +
					`Expected: ${this.isNot ? 'not' : ''}${this.utils.printExpected(expected)}\n` +
					(matcherResult
					  ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
					  : '')
      : () =>
        this.utils.matcherHint(assertionName, undefined, undefined, {
          isNot: this.isNot,
        }) +
					'\n\n' +
					`Locator: ${locator}\n` +
					`Expected: ${this.utils.printExpected(expected)}\n` +
					(matcherResult
					  ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
					  : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});