import { HomePage } from '../pages/homePage.page';
import { ProductsListPage } from '../pages/products/productsList.page';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { SalesPortalService } from './salesPortal.service';

export class HomeService extends SalesPortalService {
  private homePage = new HomePage(this.page);

  private productsListPage = new ProductsListPage(this.page);

  @logStep('Open products page')
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsListPage.waitForOpened();
  }

  @logStep('Open customers page')
  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton('Customers');
    await this.homePage.waitForSpinnerToHide();
    await this.productsListPage.waitForOpened();
  }

  @logStep('Open orders page')
  async openOrdersPage() {
    await this.homePage.clickOnViewDetailsButton('Orders');
    await this.homePage.waitForSpinnerToHide();
    await this.productsListPage.waitForOpened();
  }
}
