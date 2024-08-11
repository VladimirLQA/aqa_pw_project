import { ListPage } from '../list.page';

export class ProductsListPage extends ListPage {
  readonly uniqueElement = '//h2[.="Products List "]';

  readonly 'Add new product button' =
    this.findElement('button.page-title-header');

  // private readonly "Table row selector" = (productName: string) => `//tr[./td[text()="${productName}"]]`;
  readonly 'Name by product name' = (productName: string) =>
    this.findElement(`${this['Table row selector'](productName)}/td[1]`);

  readonly 'Price by product name' = (productName: string) =>
    this.findElement(`${this['Table row selector'](productName)}/td[2]`);

  readonly 'Manufacturer by product name' = (productName: string) =>
    this.findElement(`${this['Table row selector'](productName)}/td[3]`);

  readonly 'Created by product name' = (productName: string) =>
    this.findElement(`${this['Table row selector'](productName)}/td[4]`);

  async clickOnAddNewProductButton() {
    await this.clickOn(this['Add new product button']);
  }

  async openDetailsModalForCreatedProduct(productName: string) {
    await this.clickOn(this['Details button by entity name'](productName));
  }

  async clickOnEditButtonForCreatedProduct(productName: string) {
    await this.clickOn(this['Edit button by entity name'](productName));
  }

  async openDeleteModalForCreatedProduct(productName: string) {
    await this.clickOn(this['Delete button by entity name'](productName));
  }

  async getTableDataByName(productName: string) {
    const [price, manufacturer] = await Promise.all([
      this.getText(this['Price by product name'](productName)),
      this.getText(this['Manufacturer by product name'](productName)),
    ]);
    return { name: productName, price: +price.replace('$', ''), manufacturer };
  }
}
