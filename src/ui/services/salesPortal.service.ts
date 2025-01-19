import { expect } from 'playwright/test';
import { Locator } from '@playwright/test';
import BasePage from '../pages/salesPortal.page';
import { find } from '../../utils/array/find';
import { PageHolder } from '../pages/pageHolder.page';

export class SalesPortalService extends PageHolder {
  protected basePage = new BasePage(this.page);

  // async verifyAndCloseNotification(notificationText: string) {
  //   await this.salesPortalPage.waitForElement(this.salesPortalPage['Notification message'], { state: 'visible' });
  //   const notifications = await this.salesPortalPage.findElementArray(this.salesPortalPage['Notification message']);
  //   const expectedNotification =
  //     await find(notifications, async (notification: Locator) =>
  //       (await this.salesPortalPage.getText(notification)) ===
  //         notificationText);

  //   if (!expectedNotification) {
  //     throw new Error(`Notification message with text ${notificationText} was not found`);
  //   }

  //   const actualText = await this.salesPortalPage.getText(expectedNotification);
  //   expect(actualText).toBe(notificationText);
  //   await this.salesPortalPage.clickOn(this.salesPortalPage['Close Notification button']);
  // }
}
