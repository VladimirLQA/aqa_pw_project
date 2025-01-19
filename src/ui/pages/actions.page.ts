import { Locator } from '@playwright/test';
import { ElementState, IWaitUntilOptions, ResizeCoordinates } from 'types/core/actions.types';
import { TIMEOUT_5_SEC, TIMEOUT_10_SEC } from 'utils/timeouts';
import { isLocator } from 'utils/typeGuards/selector';
import { IResponse } from 'types/api/apiClient.types';
import { logStep } from 'utils/reporter/decorators/logStep';
import { asyncMap } from '../../utils/array/map';
import { URL } from '../../config/environment';
import { waitUntil } from '../../utils/utils';
import { PageHolder } from './pageHolder.page';
import { asyncForEach } from '../../utils/array/forEach';

export interface IOptions {timeout?: number;}

export interface TSecretValue extends IOptions {isSecret: boolean;}

export interface IOptionsWithState extends IOptions {state?: ElementState;}

export abstract class ActionsPage extends PageHolder {
  findElement(selectorOrElement: string | Locator) {
    return isLocator(selectorOrElement)
      ? selectorOrElement
      : this.page.locator(selectorOrElement);
  }

  async findElementArray(selectorOrElement: string | Locator) {
    const elements = isLocator(selectorOrElement)
      ? await selectorOrElement.all()
      : await this.findElement(selectorOrElement).all();
    return elements;
  }

  async waitForElementArray(
    selectorOrElement: string | Locator,
    options: IOptionsWithState = { timeout: TIMEOUT_10_SEC },
  ) {
    const { state, timeout } = options;
    const elements = await this.findElementArray(selectorOrElement);
    await asyncForEach(elements, async (element) => {
      await element.waitFor({ state, timeout });
    });
    return elements;
  }

  async waitForElement(selector: string | Locator, options: IOptionsWithState = { timeout: TIMEOUT_10_SEC } ) {
    const { state, timeout } = options;
    const element = this.findElement(selector);
    await element.waitFor({ state, timeout });
    return element;
  }

  async waitForElementAndScroll(selector: string | Locator, timeout = TIMEOUT_5_SEC) {
    const element = this.findElement(selector);
    await element.scrollIntoViewIfNeeded({ timeout });
    return element;
  }

  @logStep()
  async clickOn(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    await element.click({ timeout });
  }

  @logStep('Fill value "{value}" into element with {selector}')
  async fillValue(
    selector: string | Locator,
    text: string | number,
    options: TSecretValue = { isSecret: false, timeout: TIMEOUT_5_SEC },
  ) {
    const { timeout } = options;
    const element = await this.waitForElementAndScroll(selector, timeout);
    if (element) {
      await element.fill(String(text), { timeout });
    }
  }

  @logStep()
  async clear(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    if (element) {
      await element.fill('', { timeout });
    }
  }

  @logStep()
  async getText(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    const text = await element.innerText({ timeout });
    return text;
  }

  @logStep()
  async selectDropdownValue(
    dropdownSelector: string | Locator,
    optionName: string,
    timeout?: number,
  ) {
    const dropdown = this.findElement(dropdownSelector);
    await dropdown.selectOption(optionName, { timeout });
  }

  @logStep()
  async selectDropdownValueWithKeys(
    dropdownSelector: string | Locator,
    options: string | Locator,
    optionName: string,
  ) {
    await this.clickOn(dropdownSelector);
    const optionsEl = this.findElementArray(options);
    const values = await asyncMap(
      optionsEl, async (o: Locator) => o.innerText(),
    );

    const idx = values.indexOf(optionName);

    if (idx === -1) {
      throw Error(`Dropdown option with name '${optionName}' was not found`);
    }

    const keys = Array(idx).fill('ArrowDown');
    await this.pressKey([...keys, 'Enter']);
  }

  @logStep()
  async pressKey(key: string | string[], delay = 1000) {
    if (Array.isArray(key)) {
      for (const k of key) {
        await this.page.keyboard.press(k, { delay });
      }
    } else {
      await this.page.keyboard.press(key, { delay });
    }
  }

  @logStep()
  async openPage(url = URL) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  @logStep()
  async hoverElement(selector: string | Locator, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    await element.hover({ timeout });
  }

  @logStep()
  async dragAndDrop(
    elementSelector: string | Locator,
    targetSelector: string | Locator,
    timeout?: number,
  ) {
    const sourceElement =
      await this.waitForElementAndScroll(elementSelector, timeout);
    const targetElement =
      await this.waitForElementAndScroll(targetSelector, timeout);
    const sourceElementboundingBox = await sourceElement.boundingBox();
    const targetElementboundingBox = await targetElement.boundingBox();
    if (sourceElementboundingBox && targetElementboundingBox) {
      // Move the mouse to the bottom-right corner
      await this.page.mouse.move(
        sourceElementboundingBox.x + 5, sourceElementboundingBox.y + 5,
      );

      // Press the mouse button to start resizing
      await this.page.mouse.down();

      // Move the mouse to the new coordinates to resize the element
      await this.page.mouse.move(
        targetElementboundingBox.x, targetElementboundingBox.y,
      );

      // Release the mouse button to finish resizing
      await this.page.mouse.up();
    }
  }

  @logStep()
  async resizeElement(
    selector: string | Locator,
    coordinates: ResizeCoordinates,
  ) {
    const element = await this.waitForElementAndScroll(selector);

    await this.page.waitForTimeout(1000);
    const boundingBox = await element.boundingBox();
    if (boundingBox) {
      const rightDownX = boundingBox.x + boundingBox.width - 3;
      const rightDownY = boundingBox.y + boundingBox.height - 3;

      // Move the mouse to the bottom-right corner
      await this.page.mouse.move(rightDownX, rightDownY);

      // Press the mouse button to start resizing
      await this.page.mouse.down();

      // Move the mouse to the new coordinates to resize the element
      await this.page.mouse.move(
        rightDownX + coordinates.xOffset,
        rightDownY + coordinates.yOffset,
      );

      // Release the mouse button to finish resizing
      await this.page.mouse.up();
    }
  }

  async waitForResponse(url: string) {
    return this.page.waitForResponse(url);
  }

  async interceptResponse<T>(
    url: string,
    triggerAction?: () => Promise<void>,
  ): Promise<IResponse<T>> {
    const responsePromise = this.waitForResponse(url);

    if (triggerAction) {
      await triggerAction();
    }

    const response = await responsePromise;
    const data = (await response.json()) as T;

    return { data, status: response.status(), headers: response.headers() };
  }

  // async checkNotificationWithText(text: string) {
  //   let expectedNotification: Locator | undefined;
  //   await this.waitUntil(
  //     async () => {
  //       const notifications = await this.findElementArray(this["Notification message"]);
  //       for (const n of notifications) {
  //         let actualText = await this.getText(n);
  //         if (text === actualText) {
  //           expectedNotification = n;
  //           await this.clickOn(n);
  //           await this.waitForElement(n, "hidden");
  //           break;
  //         }
  //       }
  //       return !!expectedNotification;
  //     },
  //     { timeoutMsg: `Notification message with text "${text}" was not found` }
  //   );
  // }

  async waitForElementToChangeText(
    selector: string | Locator,
    text: string,
    timeout = TIMEOUT_5_SEC,
  ) {
    await waitUntil(
      async () => {
        const elementText = await this.getText(selector);
        return elementText === text;
      },
      {
        timeout,
        timeoutMsg: `Element does not have text "${text}" after ${timeout} seconds`,
      },
    );
  }

  async waitForElementsArrayToBdDisplayed(
    selector: string | Locator,
    reverse?: boolean,
    timeout = TIMEOUT_5_SEC,
  ) {
    await waitUntil(async () => {
      const elements = await this.findElementArray(selector);
      for (const element of elements) {
        await this.waitForElement(element, {
          state: reverse ? 'visible' : 'hidden',
          timeout,
        });
      }
      return true;
    });
  }

  async getCookies(url?: string) {
    const cookies = await this.page.context().cookies(url);
    return cookies;
  }

  async deleteCookies(name: string) {
    await this.page.context().clearCookies({ name });
  }

  async waitUntil(condition: () => Promise<boolean>, options?: IWaitUntilOptions) {
    const interval = options?.interval ?? 500;
    const timeout = options?.timeout ?? 10000;
    const timeoutMessage = options?.timeoutMsg || `Condition not met within the specified timeout.`;
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
      if (await condition()) {
        return;
      }

      await this.page.waitForTimeout(interval);
      elapsedTime += interval;
    }

    throw new Error(timeoutMessage);
  }
}
