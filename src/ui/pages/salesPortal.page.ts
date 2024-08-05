import { BasePage } from 'ui/pages/basePage.page';
import { URL } from 'config/environment';
import { TIMEOUT_10_SEC, TIMEOUT_5_SEC } from 'utils/timeouts';
import { logStep } from 'utils/reporter/decorators/logStep';
import { expect } from 'playwright/test';
import find from 'utils/array/find';

export abstract class SalesPortalPage extends BasePage {
  readonly 'Spinner' = this.findElement('.spinner-border');

  readonly 'Notification message' = this.findElement('.toast-body');

  readonly 'Close Notification button' = this.findElement('#toast button');

  readonly uniqueElement: string = '';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.Spinner, { state: 'hidden', timeout: TIMEOUT_5_SEC });
  }

  async waitForPageIsLoaded() {
    await this.waitForSpinnerToHide();
  }

  async getAuthorizationToken(url = URL) {
    const cookies = await this.getCookies(url);
    const token = cookies.find((cookie) => cookie.name === 'Authorization');
    return token?.value;
  }

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.openPage();
  }
}
