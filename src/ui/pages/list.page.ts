import { expect } from 'playwright/test';
import { SalesPortalPage } from './salesPortal.page';
import { services } from '../../api/services';
import { Users } from '../../utils/storages';
import map from '../../utils/array/map';
import { keyMapper } from '../../utils/mapper';
import forEach from '../../utils/array/forEach';
import { capitalize } from '../../utils/utils';

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export type TListPageNames = 'Products';

export class ListPage extends SalesPortalPage {
  uniqueElement = '';

  protected readonly 'Table row selector' = (entityName: string) =>
    this.findElement(`//tr[./td[text()="${entityName}"]]`);

  protected readonly 'Actions by entity name selector' = (entityName: string) =>
    `${this['Table row selector'](entityName)}/td[5]`;

  readonly 'Details button by entity name' = (entityName: string) =>
    this.findElement(`${this['Actions by entity name selector'](entityName)}/button[@title="Details"]`);

  readonly 'Edit button by entity name' = (entityName: string) =>
    this.findElement(`${this['Actions by entity name selector'](entityName)}/button[@title="Edit"]`);

  readonly 'Delete button by entity name' = (entityName: string) =>
    this.findElement(`${this['Actions by entity name selector'](entityName)}/button[@title="Delete"]`);

  readonly 'Table columns names row' = (pageName: string) => this.findElement(`#table-${pageName} thead th`);

  readonly "Table row values without 'style' attr" = (pageName: string) =>
    this.findElement(`//table[@id='table-${pageName}']//tbody//tr[not(@style)]`);

  readonly 'Chip buttons' = this.findElement('#chip-buttons .chip');

  readonly 'Filter button' = this.findElement('#filter');

  readonly 'Filter checkbox' = (filterName: string) => `//input[@id="${filterName}-filter"]`;

  readonly 'Apply button' = this.findElement('#apply-filters');

  readonly 'Search button' = (pageName: string) => this.findElement(`#search-${pageName}`);

  readonly 'Search input field' = this.findElement('input[type=search]');

  async getApiMappedData(pageName: string) {
    const data = (await services[pageName]
      .getAll({ token: Users.getToken() })).data[capitalize(pageName) as TListPageNames];

    return map(data, (entity) => {
      // @ts-ignore
      if (entity.price) entity.price = `$${entity.price}`;
      // @ts-ignore
      return keyMapper(entity, pageName);
    });
  }

  async getTableDataAfterFilterAndSearch(tableData: Record<string, string>[],
    chipFilters: IChipsFilterOptions) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData: Record<string, string>[] = [];

    await forEach(tableData, async (entity) => {
      const isQuickFilter: boolean | undefined = quickFilters?.some((qf) =>
        Object.values(entity).at(-1) === qf);
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
  }

  async fillSearchInputField(value: string) {
    await this.fillValue(this['Search input field'], value);
  }

  async clickOnFilterButton() {
    await this.clickOn(this['Filter button']);
  }

  async checkQuickFiltersAndClickApplyButton(filters: string[]) {
    await this.checkFiltersBox(filters);
    await this.clickOn(this['Apply button']);
    // await this.waitForPageIsLoaded();
  }

  async checkFiltersBox(labels: string[]) {
    for (const label of labels) {
      await this.clickOn(this['Filter checkbox'](label));
    }
  }

  async clickOnSearchButton() {
    await this.clickOn(this['Search button']('products'));
  }

  async parseTable(pageName: string) {
    const entities: object[] = [];
    const columnNames: [...string[]] = (await this['Table columns names row'](pageName)
      .allInnerTexts()).reduce((names, name, i, arr) => {
      if (i < arr.length - 2) {
        // @ts-ignore
        names.push(name);
      }
      return names;
    }, []) as string[];

    (await (this["Table row values without 'style' attr"](pageName)).allInnerTexts()).forEach((el) => {
      const values: string[] = [];
      el.split('\t').forEach((v, i, array) => {
        if (i < array.length - 2) {
          values.push(v);
        }
      });
      // @ts-ignore
      entities.push(Object.assign(...columnNames.map((k, idx) => ({ [k]: values[idx] }))));
    });
    return entities;
  }

  async getListOfChipButtons(pageName: string) {
    const chips = await this.findElementArray(this['Chip buttons']);
    const chipsFilters: IChipsFilterOptions = {
      quickFilters: [],
    };

    if (chips.length) {
      await forEach(chips, async (chip) => {
        const filter = await chip.getAttribute(`data-chip-${pageName}`);

        if (filter === 'search') {
          chipsFilters[filter] = await this.getText(chip);
        } else {
          chipsFilters.quickFilters?.push(await this.getText(chip));
        }
      });
    }
    return chipsFilters;
  }

  async verifyTableData(pageName: 'products' | 'customers') {
    let expected = await this.getApiMappedData(pageName);
    const chips = await this.getListOfChipButtons(pageName);
    if (chips.search || chips.quickFilters?.length) {
      expected = await this.getTableDataAfterFilterAndSearch(expected, chips);
    }
    const actual = await this.parseTable(pageName);
    expect(actual.length).toEqual(expected.length);

    for (const e of expected) {
      expect(actual).toContainEqual(e);
    }
  }
}
