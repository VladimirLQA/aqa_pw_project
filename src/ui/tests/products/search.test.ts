import {
  createAndVerifyProductsTableData as test,
} from "../../../fixtures/common/pageFactory.fixture";

test.describe("test", () => {
  test("[Products]. [Should verify table data after search with filters]", async (
    { salesPortal, createdProducts, verifyTableData }) => {

    const [p1, p2, ...p] = createdProducts;
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.clickOnFilterButton();
    await salesPortal.productsListPage.checkQuickFiltersAndClickApplyButton([p1.manufacturer, p2.manufacturer]);
    await salesPortal.productsListPage.clickOnSearchButton();
    await verifyTableData();
  });

  test("[Products]. [Should verify table data after search with search input]", async (
    { salesPortal, createdProducts, verifyTableData }) => {
    const [p1, p2, ...p] = createdProducts;
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.fillSearchInputField(p2.name);
    await salesPortal.productsListPage.clickOnSearchButton();
    await verifyTableData();
  });

  test("[Products]. [Should verify table data after search with search input and filters]", async (
    { salesPortal, createdProducts, verifyTableData }) => {
    const [p1, p2, ...p] = createdProducts;
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.fillSearchInputField(p2.name.slice());
    await salesPortal.productsListPage.clickOnFilterButton();
    await salesPortal.productsListPage.checkQuickFiltersAndClickApplyButton([p1.manufacturer]);
    await salesPortal.productsListPage.clickOnSearchButton();
    await verifyTableData();
  });
});
