import { baseFixture as test } from '../../../fixtures/common/pageFactory.fixture';
import { generateNewProduct } from '../../../data/products/productGeneration';

test.only('......', async ({ salesPortal, page }) => {
  await salesPortal.signInPage.openSalesPortal();
  await salesPortal.signInPage.signIn();
  await salesPortal.homePage.openProductsPage();
  await salesPortal.productService.checkProductInTable(generateNewProduct());

  await page.pause();
});
