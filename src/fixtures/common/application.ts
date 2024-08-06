import { PageHolder } from '../../ui/pages/pageHolder.page';
import { ProductsListService } from '../../ui/services/products/products.pageService';
import { SalesPortalService } from '../../ui/services/salesPortal.service';
import { HomeService } from '../../ui/services/home.service';
import { SignInService } from '../../ui/services/signIn.service';

export class Application extends PageHolder {
  productService = new ProductsListService(this.page);

  homeService = new HomeService(this.page);

  signInService = new SignInService(this.page);

  salePortalSerivce = new SalesPortalService(this.page);
}
