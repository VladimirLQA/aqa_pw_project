import find from "../utils/array/find";
import { expect } from "playwright/test";
import { SalesPortalPage } from "../ui/pages/salesPortal.page";

export class BaseAssertions extends SalesPortalPage {

  async verifyAndCloseNotification(notificationText: string) {
    await this.waitForElement(this["Notification message"], "visible");
    const notifications = await this.findElementArray(this["Notification message"]);
    const expectedNotification = await find(notifications, async (notification) => (await this.getText(notification)) === notificationText);

    if (!expectedNotification) throw new Error(`Notification message with text ${notificationText} was not found`);

    const actualText = await this.getText(expectedNotification);
    expect(actualText).toBe(notificationText);
    await this.click(this["Close Notification button"]);
  }
}
