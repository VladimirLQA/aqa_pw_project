import { AddEditCustomerPage } from './addEditCustomer.page';

export class EditCustomerPage extends AddEditCustomerPage {
  readonly uniqueElement: string = '//h2[contains(text(), "Edit")]';
  readonly ['Save customer button'] = `#save-customer-changes`;
  readonly ['Delete customer button'] = `#delete-customer-btn`;

  async clickOnDeleteCustomerButton() {
    await this.clickOn(this['Delete customer button']);
  }

}