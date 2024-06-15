import { logStep } from "utils/reporter/decorators/logStep";
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import forEach from "../../../utils/array/forEach";
import { ListPage } from "../list.page";


export class ProductsListPage extends ListPage {
  readonly "Add new product button" = this.findElement("button.page-title-header");
  // private readonly "Table row selector" = (productName: string) => `//tr[./td[text()="${productName}"]]`;
  readonly "Name by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[1]`);
  readonly "Price by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[2]`);
  readonly "Manufacturer by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[3]`);
  readonly "Created by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[4]`);

  @logStep("Open Add New Product Page")
  async openAddNewProductPage() {
    await this["Add new product button"].click();
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Product Details Modal")
  async openDetailsModalForCreatedProduct(productName: string) {
    await this.click(this["Details button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Edit Product Modal")
  async openEditProductModalForCreatedProduct(productName: string) {
    await this.click(this["Edit button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

  @logStep("Open Delete Product Modal")
  async openDeleteProductModalForCreatedProduct(productName: string) {
    await this.click(this["Delete button by product name"](productName));
    await this.waitForPageIsLoaded();
  }

}
