import { BasePage } from 'ui/pages/basePage.page';
import { TIMEOUT_5_SEC } from 'utils/timeouts';

export abstract class SalesPortalPage extends BasePage {
  readonly 'Spinner' = this.findElement('.spinner-border');

  readonly 'Notification message' = this.findElement('.toast-body');

  readonly 'Close Notification button' = this.findElement('#toast button');

  readonly uniqueElement: string = 'Provide selector for unique element';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.Spinner, { state: 'hidden', timeout: TIMEOUT_5_SEC });
  }

  async waitForPageIsLoaded() {
    await this.waitForSpinnerToHide();
  }

  async getAuthorizationToken() {
    const cookies = await this.getCookies();
    const token = cookies.find((cookie) => cookie.name === 'Authorization');
    return token?.value;
  }
}
