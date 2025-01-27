import { test as base } from '../base.fixture';
import { HomeService } from '../../ui/services/home.service';
import { ProductsListService } from '../../ui/services/products/products.service';
import { SignInService } from '../../ui/services/signIn.service';
import { IProductFromResponse } from '../../types/products/product.types';
import productsService from '../../api/services/products.service';

interface PageFactoryFixture {
  productListService: ProductsListService;
  homeService: HomeService;
  signInService: SignInService;
}

export const baseFixture = base.extend<PageFactoryFixture>({
  productListService: async ({ page }, use) => {
    await use(new ProductsListService(page));
  },
  homeService: async ({ page }, use) => {
    await use(new HomeService(page));
  },
  signInService: async ({ page }, use) => {
    await use(new SignInService(page));
  },
});

export const loggedAsAdmin = baseFixture.extend({
  page: async ({ page }, use) => {
    const service = new SignInService(page);
    await service.openSalesPortal();
    await service.loginAsAdmin();
    await use(page);
  },
});

export const createAndVerifyProductsTableData =
  loggedAsAdmin.extend<{createdProducts: IProductFromResponse[],}>({
    createdProducts: async ({}, use) => {
      const createdProducts: IProductFromResponse[] = await productsService.populateProducts(5);
      await use(createdProducts);

      await productsService.delete();
    },
  });
