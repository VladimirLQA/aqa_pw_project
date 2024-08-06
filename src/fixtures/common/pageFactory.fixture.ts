import { test as base } from '@playwright/test';
import { Application } from 'fixtures/common/application';
import { expect } from 'playwright/test';
import { SalesPortalServices } from '../../api/services';
import { generateNewProduct } from '../../data/products/productGeneration';
import { Users } from '../../utils/storages';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { IProductFromResponse } from '../../types/products/product.types';

interface PageFactoryFixture {
  app: Application;
  services: SalesPortalServices;
  // assert: ;

}

export const baseFixture = base.extend<PageFactoryFixture>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
  services: async ({}, use) => {
    await use(new SalesPortalServices());
  },
  // actions: async ({ page }, use) => {
  //   await use(new Actions(page));
  // },

});

// export const loggedAsAdmin = baseFixture.extend({
//   salesPortal: async ({ salesPortal }, use) => {
//     await salesPortal.signInPage.openSalesPortal();
//     await salesPortal.signInPage.signInAsAdmin();
//     await use(salesPortal);
//   },
// });
//
// export const createAndVerifyProductsTableData = loggedAsAdmin.extend<{
//   createdProducts: IProductFromResponse[],
// }>({
//   createdProducts: async ({ services }, use) => {
//     const createdProducts: IProductFromResponse[] = [];
//     for (let i = 1; i <= 5; i++) {
//       const data = generateNewProduct();
//       const response = await services.ProductService.create({ data, token: Users.getToken() });
//       expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
//       createdProducts.push(response.data.Product);
//     }
//     await use(createdProducts);
//
//     for (const p of createdProducts) {
//       await services.ProductService.delete({ token: Users.getToken(), data: { _id: p._id } });
//     }
//   },
// });
