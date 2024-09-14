import { expect } from 'playwright/test';
import { ProductsListPage } from '../../pages/products/productsList.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';
import { logStep } from '../../../utils/reporter/decorators/logStep';
import { IProduct } from '../../../types/products/product.types';
import { pick } from '../../../utils/utils';
import { ListService } from '../list.service';

export class ProductsListService extends ListService {
  private productsPage = new ProductsListPage(this.page);

  private addNewProductPage = new AddNewProductPage(this.page);

  @logStep('Open Add New Product page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProductButton();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getTableDataByName(productName: string) {
    const createdProductData =
      await this.productsPage.getTableDataByName(productName);
    return createdProductData;
  }

  @logStep('Validate product in table')
  async verifyProductInTable(product: IProduct) {
    const actualProduct =
      await this.productsPage.getTableDataByName(product.name);
    const expectedProduct = pick(product, ['name', 'price', 'manufacturer']);
    expect(actualProduct).toMatchObject(expectedProduct);
  }
}
