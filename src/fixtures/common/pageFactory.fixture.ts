import { test as base } from '@playwright/test';
import { HomeService } from '../../ui/services/home.service';
import { ProductsListService } from '../../ui/services/products/products.service';
import { SignInService } from '../../ui/services/signIn.service';

interface PageFactoryFixture {
  productService: ProductsListService;
  homeService: HomeService;
  signInService: SignInService;
  // assert: ;

}

export const baseFixture = base.extend<PageFactoryFixture>({
  productService: async ({ page }, use) => {
    await use(new ProductsListService(page));
  },
  homeService: async ({ page }, use) => {
    await use(new HomeService(page));
  },
  signInService: async ({ page }, use) => {
    await use(new SignInService(page));
  },
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
