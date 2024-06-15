import { BaseAssertions } from "./base.assertions";
import { ListPage } from "../ui/pages/list.page";
import { expect } from "playwright/test";

export class ListAssertions extends BaseAssertions {
  private listPage = new ListPage(this.page);

  async verifyTableData (pageName: "products" | "customers") {
    let expected = await this.listPage.getApiMappedData(pageName);
    const chips = await this.listPage.getListOfChipButtons();
    console.log("chips", chips);
    if (chips.search || chips.quickFilters?.length) {
      expected = await this.listPage.getTableDataAfterFilterAndSearch(expected, chips);
    }
    const actual = await this.listPage.parseTable();
    expect(actual.length).toEqual(expected.length);

    for (const e of expected) {
      expect(actual).toContainEqual(e);
    }
  };
}
