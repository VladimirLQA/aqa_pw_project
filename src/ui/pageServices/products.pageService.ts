import { PageHolder } from "../pages/basePage.page";
import { ProductsListPage } from "../pages/products/productsList.page";
import { AddNewProductPage } from "../pages/products/addNewProduct.page";
import ProductService from "../../api/services/product.service";
import ProductsAssertions from "../../assertions/products.assertions";
import { HomePage } from "../pages/homePage.page";

export class ProductsPageService extends PageHolder {

  productsListPage = new ProductsListPage(this.page);
  addNewProductPage = new AddNewProductPage(this.page);
  service = ProductService;
  assert = new ProductsAssertions(this.page);
  // homePage = new HomePage(this.page);

}
