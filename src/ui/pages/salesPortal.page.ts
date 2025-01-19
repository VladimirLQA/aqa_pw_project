import { ActionsPage } from 'ui/pages/actions.page';
import { TIMEOUT_5_SEC } from 'utils/timeouts';

export default class BasePage extends ActionsPage {
  readonly 'Spinner' = this.findElement('.spinner-border');
  readonly 'Notification message' = this.findElement('.toast-body');
  readonly 'Close Notification button' = this.findElement('#toast button');
  readonly uniqueElement: string = `Provide "uniqueElement" for class: "${this.constructor.name}"`;

  async waitForOpened() {
    await this.waitForSpinnersToBeHidden();
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.Spinner, { state: 'hidden', timeout: TIMEOUT_5_SEC });
  }

  async waitForSpinnersToBeHidden(page: string = this.constructor.name) {
    await this.waitUntil(
      async () => {
        const spinners = await this.findElementArray(this.Spinner);
        return !spinners.length;
      },
      {
        timeout: 30000,
        timeoutMsg: `At least 1 spinner is still displayed on page ${page}`,
        interval: 300,
      }
    );
  }

  async getAuthorizationToken() {
    const cookies = await this.getCookies();
    const token = cookies.find((cookie) => cookie.name === 'Authorization');
    return token?.value;
  }
}

export abstract class UniqueElement extends BasePage {
  abstract uniqueElement: string;
}
