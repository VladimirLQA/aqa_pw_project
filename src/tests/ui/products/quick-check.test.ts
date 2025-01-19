import { baseFixture as test } from '../../../fixtures/common/pageFactory.fixture';

test.only('......', async (
  {
    signInService, homeService, page,
  },
) => {
  await signInService.openSalesPortal();
  await signInService.loginAsAdmin();
  await homeService.openProductsPage();
  await page.pause();
});
