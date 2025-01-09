import { createAndVerifyProductsTableData as test, } from '../../../fixtures/common/pageFactory.fixture';

test.describe('test', () => {
  test('[Products]. [Should verify table data after search with filters]', async (
    { createdProducts, productListService, homeService },
  ) => {
    const [p1, p2, ...p] = createdProducts;
    await homeService.openProductsPage();
    await productListService.clickOnFilterButton();
    await productListService.apllyQuickFilters(
      [p1.manufacturer, p2.manufacturer],
    );
    await productListService.verifyTableData('products');
  });
});
// TODO rewrite with current form of fixturest
// test('[Products]. [Should verify table data after search with search input]', async (
//   { salesPortal, createdProducts },
// ) => {
//   const [p1, p2, ...p] = createdProducts;
//   await salesPortal.homePage.openProductsPage();
//   await salesPortal.listPage.fillSearchInputField(p2.name);
//   await salesPortal.listPage.clickOnSearchButton();
// });

// test('[Products]. [Should verify table data after search with search input and filters]', async (
//   { salesPortal, createdProducts },
// ) => {
//   const [p1, p2, ...p] = createdProducts;
//   await salesPortal.homePage.openProductsPage();
//   await salesPortal.listPage.fillSearchInputField(p2.name.slice());
//   await salesPortal.listPage.clickOnFilterButton();
//   await salesPortal.listPage.checkQuickFiltersAndClickApplyButton([p1.manufacturer]);
//   await salesPortal.listPage.clickOnSearchButton();
// });
