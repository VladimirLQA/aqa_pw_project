import { expect } from '@playwright/test';
import { SalesPortalService } from './salesPortal.service';
import { ProductsListPage } from '../pages/products/productsList.page';
import { CustomersListPage } from '../pages/customers/customersList.page';

export class ListService extends SalesPortalService {
  protected products = new ProductsListPage(this.page);
  protected customers = new CustomersListPage(this.page);

  async verifyTableData(pageName: 'products' | 'customers') {
    let expected = await this[pageName].getApiMappedData(pageName);
    const chips = await this[pageName].getListOfChipButtons(pageName);
    if (chips.search || chips.quickFilters?.length) {
      expected = await this[pageName].getTableDataAfterFilterAndSearch(expected, chips);
    }
    const actual = await this.products.parseTable(pageName);
    expect(actual.length).toEqual(expected.length);

    for (const e of expected) {
      expect(actual).toContainEqual(e);
    }
  }
}
