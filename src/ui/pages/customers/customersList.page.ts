import { ListPage } from '../list.page';

export class CustomersListPage extends ListPage {
  readonly uniqueElement: string = '//h2[text()="Customers List "]';
  readonly 'Add New Customer button' = 'button.page-title-header';
  readonly 'Edit button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;
  readonly 'Empty table message' = 'td.fs-italic';

  async clickOnAddNewCustomer() {
    await this.clickOn(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.clickOn(this['Edit button by table row'](customerName));
  }

  async getEmptyTableMessage() {
    return this.getText(this['Empty table message']);
  }
}