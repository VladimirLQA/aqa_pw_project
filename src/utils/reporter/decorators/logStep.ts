import { test } from '@playwright/test';
import { hideSecretData } from '../../string';

/**
 * Decorator that wraps a step method with a Playwright test step.
 * Used for reporting purposes.
 *
 * @example
 ```
 import { step } from './step_decorator';
 class MyTestClass {
 @step('optional step name')
 async myTestFunction() {
 // Test code goes here
 }
 }
 ```
 */
export const logStep = <This, Args extends any[], Return>(message?: string) =>
  function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (
      this: This, ...args: Args
    ) => Promise<Return>>,
  ) {
    function replacementMethod(this: any, ...args: Args) {
      const [selector, value, ...options] = args;
      const isSecretObj = options.find(
        (option) => typeof option === 'object' && 'isSecret' in option,
      );

      const stepName = message
        ? message.replace('{value}', `${isSecretObj?.isSecret ? hideSecretData(value) : value}`)
        : `${this.constructor.name}.${context.name as string}`;

      return test.step(stepName, async () => target.call(this, ...args), {
        box: false,
      });
    }
    return replacementMethod;
  };
