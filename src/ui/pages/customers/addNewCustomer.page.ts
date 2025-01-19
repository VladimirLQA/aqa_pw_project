import { AddEditCustomerPage } from "./addEditCustomer.page";

export class AddCustomerPage extends AddEditCustomerPage {
  readonly uniqueElement: string = '//h2[.="Add New Customer "]';
  readonly ['Save customer button'] = `#save-new-customer`;

}