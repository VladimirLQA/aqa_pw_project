import { Locator } from '@playwright/test';
import { ICustomer } from '../../../types/customers/customers.types';
import { UniqueElement } from '../salesPortal.page';

export abstract class AddEditCustomerPage extends UniqueElement {
  abstract readonly ['Save customer button']: string | Locator;

  readonly 'Name input' = '#inputName';
  readonly 'Email input' = '#inputEmail';
  readonly 'Country dropdown' = 'select#inputCountry';
  readonly 'City input' = '#inputCity';
  readonly 'Street input' = '#inputStreet';
  readonly 'House input' = '#inputHouse';
  readonly 'Flat input' = '#inputFlat';
  readonly 'Phone input' = '#inputPhone';
  readonly 'Notes textarea' = '#textareaNotes';

  async fillInputs(customer: Partial<ICustomer>) {
    customer.name && (await this.fillValue(this['Name input'], customer.name));
    customer.email && (await this.fillValue(this['Email input'], customer.email));
    customer.country && (await this.selectDropdownValue(this['Country dropdown'], customer.country));
    customer.city && (await this.fillValue(this['City input'], customer.city));
    customer.street && (await this.fillValue(this['Street input'], customer.street));
    customer.house && (await this.fillValue(this['House input'], customer.house));
    customer.flat && (await this.fillValue(this['Flat input'], customer.flat));
    customer.phone && (await this.fillValue(this['Phone input'], customer.phone));
    customer.notes && (await this.fillValue(this['Notes textarea'], customer.notes));
  }

  async clickOnSaveButton() {
    await this.clickOn(this['Save customer button']);
  }

}