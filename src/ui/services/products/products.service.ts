import { expect } from 'playwright/test';
import { ProductsListPage } from '../../pages/products/productsList.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';
import { logStep } from '../../../utils/reporter/decorators/logStep';
import { IProduct } from '../../../types/products/product.types';
import { pick } from '../../../utils/utils';
import { ListService } from '../list.service';
import { DetailsModalPage } from '../../pages/modals/details.page';

export class ProductsListService extends ListService {
  private addNewProductPage = new AddNewProductPage(this.page);

  @logStep('Open Add New Product page')
  async openAddNewProductPage() {
    await this.products.clickOnAddNewProductButton();
    await this.products.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getTableDataByName(productName: string) {
    const createdProductData = await this.products.getTableDataByName(productName);
    return createdProductData;
  }

  @logStep('Validate product in table')
  async expectProductInTable(product: IProduct) {
    const actualProduct =
      await this.products.getTableDataByName(product.name);
    const expectedProduct = pick(product, ['name', 'price', 'manufacturer']);
    expect(actualProduct).toMatchObject(expectedProduct);
  }

  @logStep()
  async openFilterModal() {
    await this.products.clickOnFilterButton();
  }

  @logStep()
  async apllyQuickFilters(filters: string[]) {
    await this.products.checkFiltersBox(filters);
    await this.products.clickOnApplybutton();
    await this.products.clickOnSearchButton('products');
  }
}
