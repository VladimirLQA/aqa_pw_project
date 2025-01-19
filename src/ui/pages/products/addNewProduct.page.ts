import { IProduct } from 'types/products/product.types';
import { AddEditProductPage } from './addEditProduct.page';

export class AddNewProductPage extends AddEditProductPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';
  readonly 'Save Product button' = this.findElement('#save-new-product');
  readonly 'Page body' = this.findElement('//div[@id="root"]/div');

  async fillProductInputs(product: IProduct) {
    product.name && await this.fillValue(this['Name input'], product.name);
    product.manufacturer && await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    product.price && await this.fillValue(this['Price input'], `${product.price}`);
    product.amount && await this.fillValue(this['Amount input'], `${product.amount}`);
    product.notes && await this.fillValue(this['Notes textarea'], product.notes);
  }

  async clickOnSaveNewProductButton() {
    await this.clickOn(this['Save Product button']);
  }
}
