import { PageHolder } from '../../ui/pages/basePage.page';
import { ProductsListService } from '../../ui/services/products/products.pageService';
import { SalesPortalService } from '../../ui/services/salesPortal.pageService';

export class Application extends PageHolder {
  productService = new ProductsListService(this.page);

  salePortalSerivce = new SalesPortalService(this.page);
}
