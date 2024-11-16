import { baseFixture as test } from '../../../fixtures/common/pageFactory.fixture';

test.only('......', async (
  {
    signInService, homeService, page,
  },
) => {
  await signInService.openSalesPortal();
  await signInService.loginAsAdmin();
  await homeService.openProductsPage(); // at this step I'd like to get mocked data, because the browser calls the specified endpoint in handler

  await page.pause();
});
