import { SalesPortalPage } from "./salesPortal.page";
import { services } from "../../api/services";
import { Users } from "../../utils/entities";
import map from "../../utils/array/map";
import { keyMapper } from "../../utils/mapper";
import forEach from "../../utils/array/forEach";

class Utils {
  capitalize(word: string): string {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  }
}

export default new Utils();

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export class ListPage extends SalesPortalPage {
  private readonly "Table row selector" = (productName: string) => `//tr[./td[text()="${productName}"]]`;
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

  async getApiMappedData(pageName: "products" | "customers") {
    const allProducts = (await services[pageName].getAll({ token: Users.getToken() })).data["Products"];
    return await map(allProducts, (entity) => {
      // @ts-ignore
      if (entity["price"]) entity["price"] = `$${entity.price}`;
      // @ts-ignore
      return keyMapper(entity, "products");
    });
  };

  async getTableDataAfterFilterAndSearch(tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData: Record<string, string>[] = [];

    await forEach(tableData, async (entity) => {
      const isQuickFilter: boolean | undefined = quickFilters?.some((qf) => Object.values(entity).at(-1) === qf);
      const isSearchFilter: boolean = Object.values(entity).some((val) =>
        // @ts-ignore
        val.toLowerCase().includes(search?.toLowerCase()));

      if (search && quickFilters?.length) {
        if (isQuickFilter && isSearchFilter) filteredAndSearchedData.push(entity);
      } else if (search) {
        if (isSearchFilter) filteredAndSearchedData.push(entity);
      } else if (quickFilters?.length) {
        if (isQuickFilter) filteredAndSearchedData.push(entity);
      }
    });
    return filteredAndSearchedData;
  };

  async fillSearchInputField(value: string) {
    await this.setValue(this["Search input field"], value);
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
