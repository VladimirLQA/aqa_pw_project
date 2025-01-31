import { baseFixture as test } from '../../../fixtures/common/pageFactory.fixture';
import { IProduct, MANUFACTURERS } from '../../../types/products/product.types';

test('Some text tag', async (
  { signInService, homeService, page, productListService },
) => {
  await signInService.openSalesPortal();
  await signInService.loginAsAdmin();
  await homeService.openProductsPage(); // at this step I'd like to get mocked data, because the browser calls the specified endpoint in handler
  await productListService.openAddNewProductPage();
  await productLis;
  // const a: IProduct = { 'name': 'Soap25141', 'amount': 12, 'price': 15111, 'manufacturer': MANUFACTURERS.AMAZON, 'notes': 'kCjsuOAj5CT9tGg9v3n8e1eFGSc6UKZfeGzNrk9B8mSICiFE2EAffknxI0FuDyb6duPj9TyUc4mqwcSeuYCW9JBs8IelowzSiGJlSbHqEAruGbO0e8eni1aJYAsUGMzupcgi0hgMxOKayVCO0lC4T7TcPWTZlDd82UNUjEYwNrCLGgr31j90Zq0SXyIXm9959sKwxYaVtWsRm87q1uXNwq2HpR6GVHQOSSvJyvGcB3Td0XhVxehrZzknan' };
  // await productListService.checkInfoInDetailsModal<IProduct>(a);

  await page.pause();
});
