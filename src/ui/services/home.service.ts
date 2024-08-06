import { HomePage } from '../pages/homePage.page';
import { PageHolder } from '../pages/pageHolder.page';
import { ProductsListPage } from '../pages/products/productsList.page';
import { logStep } from '../../utils/reporter/decorators/logStep';

export class HomeService extends PageHolder {
  private homePage = new HomePage(this.page);

  private productsListPage = new ProductsListPage(this.page);

  @logStep('Open products page')
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsListPage.waitForOpened();
  }
}
