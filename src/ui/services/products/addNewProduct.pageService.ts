import { PageHolder } from '../../pages/basePage.page';
import { ProductsListPage } from '../../pages/products/productsList.page';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page';

export class AddNewProductService extends PageHolder {
  private productsPage = new ProductsListPage(this.page);

  private addNewProductPage = new AddNewProductPage(this.page);

  // service = ProductService;
  // assert = new ProductsAssertions(this.page);
  // homePage = new HomePage(this.page);
}
