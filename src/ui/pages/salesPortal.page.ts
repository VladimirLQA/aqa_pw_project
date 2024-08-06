import { BasePage } from 'ui/pages/basePage.page';
import { URL } from 'config/environment';
import { TIMEOUT_5_SEC } from 'utils/timeouts';
import { logStep } from 'utils/reporter/decorators/logStep';
import { UniqueElementProperty } from '../../types/common.types';

export abstract class SalesPortalPage extends BasePage implements UniqueElementProperty {
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

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.openPage();
  }
}
