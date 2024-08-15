import { expect } from '@playwright/test';
import { ListPage } from '../pages/list.page';
import { SalesPortalService } from './salesPortal.service';

export class ListService extends SalesPortalService {
  private listPage = new ListPage(this.page);

  async verifyTableData(pageName: 'products' | 'customers') {
    let expected = await this.listPage.getApiMappedData(pageName);
    const chips = await this.listPage.getListOfChipButtons(pageName);
    if (chips.search || chips.quickFilters?.length) {
      expected = await this.listPage
        .getTableDataAfterFilterAndSearch(expected, chips);
    }
    const actual = await this.listPage.parseTable(pageName);
    expect(actual.length).toEqual(expected.length);

    for (const e of expected) {
      expect(actual).toContainEqual(e);
    }
  }
}
