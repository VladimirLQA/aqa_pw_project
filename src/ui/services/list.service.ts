import { expect } from '@playwright/test';
import { SalesPortalService } from './salesPortal.service';
import { ProductsListPage } from '../pages/products/productsList.page';
import { CustomersListPage } from '../pages/customers/customersList.page';
import { DetailsModalPage } from '../pages/modals/details.page';

export class ListService extends SalesPortalService {
  protected products = new ProductsListPage(this.page);
  protected customers = new CustomersListPage(this.page);
  protected detailsModalPage = new DetailsModalPage(this.page);

  async openDetailsModal(entityName: string) {
    await this.products.clickOnDetailsEntityButton(entityName);
  }

  async checkInfoInDetailsModal<T extends { name: string }>(entityInfo: T) {
    await this.openDetailsModal(entityInfo.name);
    const acutalModalData = await this.detailsModalPage.getDetailsModalData<T>();
    expect(acutalModalData).toEqual(entityInfo);
  }

  async checkTableData(pageName: 'products' | 'customers') {
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
