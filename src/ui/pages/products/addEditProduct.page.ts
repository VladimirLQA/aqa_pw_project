import { Locator } from '@playwright/test';
import { AddProductFields, IProduct } from '../../../types/products/product.types';
import { UniqueElement } from '../salesPortal.page';

export abstract class AddEditProductPage extends UniqueElement {
  abstract readonly ['Save Product button']: string | Locator;

  readonly ['Name input'] = '#inputName';
  readonly ['Manufacturer dropdown'] = '#inputManufacturer';
  readonly ['Price input'] = '#inputPrice';
  readonly ['Amount input'] = '#inputAmount';
  readonly ['Notes textarea'] = '#textareaNotes';
  readonly ['Products link'] = '.back-link';

  getErrorInputSelector(inputField: AddProductFields) {
    return `#error-${this[inputField].replace('#', '')}`;
  }

  async getErrorText(inputField: AddProductFields) {
    return this.getText(this.getErrorInputSelector(inputField));
  }

  async fillInputs(product: Partial<IProduct>) {
    if (product.name) await this.fillValue(this['Name input'], product.name);
    if (product.manufacturer) await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    if (product.price) await this.fillValue(this['Price input'], product.price);
    if (product.amount) await this.fillValue(this['Amount input'], product.amount);
    if (product.notes) await this.fillValue(this['Notes textarea'], product.notes);
  }

  async clickOnSaveButton() {
    await this.clickOn(this['Save Product button']);
  }

  async clickOnProductsLink() {
    await this.clickOn(this['Products link']);
  }
}