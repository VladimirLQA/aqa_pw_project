import { Locator } from '@playwright/test';
import { UniqueElement } from 'ui/pages/salesPortal.page';

export enum ETotalHomeMetric {
  TOTAL_REVENUE = 'TOTAL-REVENUE',
  TOTAL_CUSTOMERS = 'TOTAL-CUSTOMERS',
  AVG_ORDERS_VALUE = 'AVG-ORDERS-VALUE',
  CANCELED_ORDERS = 'CANCELED-ORDERS',
  TOTAL_ORDERS = 'TOTAL-ORDERS'
}

export class HomePage extends UniqueElement {
  readonly uniqueElement: string = '.page-header h1';
  readonly 'Products view details button' = this.findElement('button#products-from-home');
  readonly 'Orders view details button' = this.findElement('button#orders-from-home');
  readonly 'Customers view details button' = this.findElement('button#customers-from-home');
  readonly 'Metric container' = (name: ETotalHomeMetric) => this.findElement(`#${name.toLowerCase()}-container`);
  readonly 'Total metrics': Record<ETotalHomeMetric, { container: Locator, value: () => Locator }> = {
    [ETotalHomeMetric.TOTAL_REVENUE]: {
      container: this['Metric container'](ETotalHomeMetric.TOTAL_REVENUE),
      value: () => this['Total metrics'][ETotalHomeMetric.TOTAL_REVENUE].container.locator('p'),
    },
    [ETotalHomeMetric.TOTAL_CUSTOMERS]: {
      container: this['Metric container'](ETotalHomeMetric.TOTAL_CUSTOMERS),
      value: () => this['Total metrics'][ETotalHomeMetric.TOTAL_CUSTOMERS].container.locator('p'),
    },
    [ETotalHomeMetric.AVG_ORDERS_VALUE]: {
      container: this['Metric container'](ETotalHomeMetric.AVG_ORDERS_VALUE),
      value: () => this['Total metrics'][ETotalHomeMetric.AVG_ORDERS_VALUE].container.locator('p'),
    },
    [ETotalHomeMetric.CANCELED_ORDERS]: {
      container: this['Metric container'](ETotalHomeMetric.CANCELED_ORDERS),
      value: () => this['Total metrics'][ETotalHomeMetric.CANCELED_ORDERS].container.locator('p'),
    },
    [ETotalHomeMetric.TOTAL_ORDERS]: {
      container: this['Metric container'](ETotalHomeMetric.TOTAL_ORDERS),
      value: () => this['Total metrics'][ETotalHomeMetric.TOTAL_ORDERS].container.locator('p'),
    },
  };

  async getMetricValue(metric: ETotalHomeMetric) {
    const value = this.getText(this['Total metrics'][metric].value());
    return value;
  }

  readonly 'Sidebar button by name' = (name: 'Products' | 'Customers' | 'Orders' | 'Home') => `a[name="${name}"]`;

  async clickOnViewDetailsButton(moduleName: 'Products' | 'Customers' | 'Orders') {
    await this.clickOn(this[`${moduleName} view details button`]);
  }

  async clickOnSidebarPageButton(moduleName: 'Products' | 'Customers' | 'Orders' | 'Home') {
    await this.clickOn(this['Sidebar button by name'](moduleName));
  }
}
