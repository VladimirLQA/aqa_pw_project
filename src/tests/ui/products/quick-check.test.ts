import { baseFixture as test } from '../../../fixtures/common/pageFactory.fixture';
import { generateNewProduct } from '../../../data/products/productGeneration';

test.only('......', async (
  {
    signInService, homeService, productService, page,
  },
) => {
  await signInService.openSalesPortal();
  await signInService.loginAsAdmin();
  // await homeService.openProductsPage();

  await page.pause();
});
