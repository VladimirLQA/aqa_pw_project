import { BasePage } from 'ui/pages/basePage.page';
import { TIMEOUT_5_SEC } from 'utils/timeouts';
import { logStep } from 'utils/reporter/decorators/logStep';

export abstract class SalesPortalPage extends BasePage {
  readonly 'Spinner' = this.findElement('.spinner-border');

  readonly 'Notification message' = this.findElement('.toast-body');

  readonly 'Close Notification button' = this.findElement('#toast button');

  protected uniqueElement: string = 'Provide uniqueElement';

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

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.openPage();
  }
}
