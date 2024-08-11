import { expect } from 'playwright/test';
import { Locator } from '@playwright/test';
import { SalesPortalPage } from '../pages/salesPortal.page';
import { find } from '../../utils/array/find';

export class SalesPortalService extends SalesPortalPage {
  async verifyAndCloseNotification(notificationText: string) {
    await this.waitForElement(this['Notification message'], { state: 'visible' });
    const notifications = await this.findElementArray(this['Notification message']);
    const expectedNotification =
      await find(notifications, async (notification: Locator) =>
        (await this.getText(notification)) === notificationText);

    if (!expectedNotification) {
      throw new Error(`Notification message with text ${notificationText} was not found`);
    }

    const actualText = await this.getText(expectedNotification);
    expect(actualText).toBe(notificationText);
    await this.clickOn(this['Close Notification button']);
  }
}
