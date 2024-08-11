import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { UniqueElementProperty } from '../../types/common.types';

export class HomePage extends SalesPortalPage implements UniqueElementProperty {
  readonly 'Products view details button' = this.findElement('button#products-from-home');

  readonly 'Orders view details button' = this.findElement('button#orders-from-home');

  readonly 'Customers view details button' = this.findElement('button#customers-from-home');

  readonly uniqueElement: string = 'div#myCarousel';

  readonly 'Sidebar button by name' =
    (name: 'Products' | 'Customers' | 'Orders' | 'Home') =>
      `//a[text()[normalize-space() = '${name}']]`;

  async clickOnViewDetailsButton(
    moduleName: 'Products' | 'Customers' | 'Orders',
  ) {
    await this.clickOn(this[`${moduleName} view details button`]);
  }

  async clickOnSidebarPageButton(
    moduleName: 'Products' | 'Customers' | 'Orders' | 'Home',
  ) {
    await this.clickOn(this['Sidebar button by name'](moduleName));
  }
}
