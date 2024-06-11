import { mergeTests, expect } from "@playwright/test";
import { test as testProduct } from "fixtures/products/products.fixture";
import { generateNewProduct } from "data/products/productGeneration";
import { loggedAsAdmin } from "../../../fixtures/common/pageFactory.fixture";
import { Products } from "../../../utils/entities";

const test = mergeTests(loggedAsAdmin, testProduct);

test.describe("[Products]. [Snapshot test]", () => {

  test("[Add new product page]", async ({ salesPortal, page }) => {
    await salesPortal.homePage.openProductsPage();
    await salesPortal.productsListPage.openAddNewProductPage();
    const product = generateNewProduct({ name: "22", amount: 0, price: 0, notes: "<>", manufacturer: "Microsoft" });
    await salesPortal.addNewProductPage.fillProductInputs(product);

    await expect(salesPortal.addNewProductPage["Page body"]).toHaveScreenshot("Input-validations.png");
  });

  test.afterEach(async ({ deleteProduct }) => {
    const products = Products.getAllCreatedProducts();
    for (const product of products) {
      await deleteProduct(product._id);
      Products.removeProduct(product._id);
    }
  });
});
