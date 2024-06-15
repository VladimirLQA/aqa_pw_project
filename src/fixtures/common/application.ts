import { HomePage } from "ui/pages/homePage.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { SignInPage } from "ui/pages/signInPage.page";
import { PageHolder } from "../../ui/pages/basePage.page";
import { ListPage } from "../../ui/pages/list.page";
import { ProductsPageService } from "../../ui/pageServices/products.pageService";

export class Application extends PageHolder {
  productPageService = new ProductsPageService(this.page);

  homePage = new HomePage(this.page);
  // listPage = new ListPage(this.page);
  signInPage = new SignInPage(this.page);
}
