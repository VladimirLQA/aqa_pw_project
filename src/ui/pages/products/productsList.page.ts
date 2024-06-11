import { logStep } from "utils/reporter/decorators/logStep";
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import forEach from "../../../utils/array/forEach";

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export class ProductsListPage extends SalesPortalPage {
  readonly "Add new product button" = this.findElement("button.page-title-header");
  private readonly "Table row selector" = (productName: string) => `//tr[./td[text()="${productName}"]]`;
  readonly "Name by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[1]`);
  readonly "Price by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[2]`);
  readonly "Manufacturer by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[3]`);
  readonly "Created by product name" = (productName: string) => this.findElement(`${this["Table row selector"](productName)}/td[4]`);
  private readonly "Actions by product name selector" = (productName: string) => `${this["Table row selector"](productName)}/td[5]`;
  readonly "Details button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Details"]`);
  readonly "Edit button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Edit"]`);
  readonly "Delete button by product name" = (productName: string) => this.findElement(`${this["Actions by product name selector"](productName)}/button[@title="Delete"]`);
  readonly "Table columns names row" = this.findElement("#table-products thead th");
  readonly "Table row values without 'style' attr" = this.findElement(`//table[@id='table-products']//tbody//tr[not(@style)]`);
  readonly "Chip buttons" = this.findElement("#chip-buttons .chip");
  readonly "Filter button" = this.findElement("#filter");
  readonly "Filter checkbox" = (filterName: string) => `//input[@id="${filterName}-filter"]`;
  readonly "Apply button" = this.findElement("#apply-filters");
  readonly "Search button" = (pageName: string) => `#search-${pageName}`;
  readonly "Search input field" = `input[type=search]`;

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

  async fillSearchInputField(value: string) {
    await this.setValue(this['Search input field'], value);
  }

  async clickOnFilterButton() {
    await this.click(this["Filter button"]);
  }

  async checkQuickFiltersAndClickApplyButton(filters: string[]) {
    await this.checkFiltersBox(filters);
    await this.click(this["Apply button"]);
    await this.waitForPageIsLoaded();
  }

  async checkFiltersBox(labels: string[]) {
    for (const label of labels) {
      await this.click(this["Filter checkbox"](label));
    }
  }

  async clickOnSearchButton() {
    await this.click(this["Search button"]("products"));
  }

  async parseTable() {
    const entities: object[] = [];
    const columnNames: [...string[]] = (await this["Table columns names row"].allInnerTexts()).reduce((names, name, i, arr) => {
      if (i < arr.length - 2) {
        // @ts-ignore
        names.push(name);
      }
      return names;
    }, []) as string[];

    (await (this["Table row values without 'style' attr"]).allInnerTexts()).forEach((el) => {
      const values: string[] = [];
      el.split("\t").forEach((v, i, array) => {
        if (i < array.length - 2) {
          values.push(v);
        }
      });
      // @ts-ignore
      entities.push(Object.assign(...columnNames.map((k, idx) => ({ [k]: values[idx] }))));
    });
    return entities;
  }

  async getListOfChipButtons() {
    const chips = await this.findElementArray(this["Chip buttons"]);
    const chipsFilters: IChipsFilterOptions = {
      quickFilters: [],
    };

    if (chips.length) {
      await forEach(chips, async (chip) => {
        const filter = await chip.getAttribute(`data-chip-products`);

        if (filter === "search") {
          chipsFilters[filter] = await this.getText(chip);
        } else {
          chipsFilters.quickFilters?.push(await this.getText(chip));
        }
      });
    }
    return chipsFilters;
  }
}
