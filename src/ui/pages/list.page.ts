import { UniqueElement } from './salesPortal.page';
import { clients } from '../../api/clients';
import { keyMapper } from '../../utils/mapper';
import { capitalize } from '../../utils/utils';
import { IChipsFilterOptions, TListPageNames } from '../../types/common.types';
import { asyncForEach } from '../../utils/array/forEach';
import { asyncMap } from '../../utils/array/map';
import signInService from '../../api/services/signIn.service';

export abstract class ListPage extends UniqueElement {
  readonly 'Table row selector' = (entityName: string) => `//tr[./td[text()="${entityName}"]]`;

  readonly 'Actions by entity name selector' = (entityName: string) =>
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
  readonly 'Clear filters button' = this.findElement('#clear-filters');
  readonly 'Search button' = (pageName: string) => this.findElement(`#search-${pageName}`);
  readonly 'Search input field' = this.findElement('input[type=search]');

  async clickOnDetailsEntityButton(entityName: string) {
    await this.clickOn(this['Details button by entity name'](entityName));
  }

  async getApiMappedData(pageName: keyof typeof clients) {
    // @ts-expect-error A TS error is expected due to received 'union type'
    const data = (await clients[pageName].getAll({ token: signInService.getToken() }))
      .data[capitalize(pageName) as TListPageNames];

    return asyncMap(data, (entity: { [key: string]: any }) => {
      if (entity.price) entity.price = `$${entity.price}`;
      return keyMapper(entity, pageName);
    });
  }

  async getTableDataAfterFilterAndSearch(
    tableData: Record<string, string>[], chipFilters: IChipsFilterOptions
  ) {
    const { search, quickFilters } = chipFilters;
    const filteredAndSearchedData: Record<string, string>[] = [];

    await asyncForEach(tableData, async (entity) => {
      const isQuickFilter: boolean | undefined = quickFilters?.some((qf) => Object.values(entity).at(-1) === qf);
      const isSearchFilter = Object.values(entity).some((val) => val.toLowerCase().includes((search ?? '').toLowerCase()));

      if (search && quickFilters?.length) {
        if (isQuickFilter && isSearchFilter) {
          filteredAndSearchedData.push(entity);
        }
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

  async clickOnApplybutton() {
    await this.clickOn(this['Apply button']);
  }

  async checkFiltersBox(labels: string[]) {
    for (const label of labels) {
      await this.clickOn(this['Filter checkbox'](label));
    }
  }

  async clickOnSearchButton(page: string) {
    await this.clickOn(this['Search button'](page));
  }
  // TODO could be refactored

  async parseTable(pageName: string) {
    const entities: object[] = [];
    const columnNames: [...string[]] =
      (await this['Table columns names row'](pageName).allInnerTexts())
        .reduce((names, name: string, i, arr) => {
          if (i < arr.length - 2) {
            names.push(name);
          }
          return names;
        }, [] as string[]);

    (await (this["Table row values without 'style' attr"](pageName)).allInnerTexts()).forEach((el) => {
      const values: string[] = [];
      el.split('\t').forEach((v, i, array) => {
        if (i < array.length - 2) {
          values.push(v);
        }
      });
      const mappedValues = columnNames.map((k, idx) => ({ [k]: values[idx] }));
      entities.push(Object.assign({}, mappedValues));
    });
    return entities;
  }

  async getListOfChipButtons(pageName: string) {
    const chips = await this.findElementArray(this['Chip buttons']);
    const chipsFilters: IChipsFilterOptions = { quickFilters: [] };

    if (chips.length) {
      await asyncForEach(chips, async (chip) => {
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
}
