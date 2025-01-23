import { test as base, expect } from '../base.fixture';
import { HomeService } from '../../ui/services/home.service';
import { ProductsListService } from '../../ui/services/products/products.service';
import { SignInService } from '../../ui/services/signIn.service';
import { generateNewProduct } from '../../data/products/productGeneration';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { IProductFromResponse } from '../../types/products/product.types';
import { controllers } from '../../api/controllers';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment';

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
      const createdProducts: IProductFromResponse[] = [];

      const signInResponse = await controllers.signIn.login({
        data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD },
      });
      const { token } = signInResponse.data;
      for (let i = 1; i <= 5; i++) {
        const data = generateNewProduct();
        const response = await controllers.products.create(
          { data, token },
        );
        expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
        createdProducts.push(response.data.Product);
      }
      await use(createdProducts);

      for (const p of createdProducts) {
        await controllers.products.delete(
          { token, data: { _id: p._id } },
        );
      }
    },
  });
