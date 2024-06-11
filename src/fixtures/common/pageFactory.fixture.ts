import { test as base } from "@playwright/test";
import { Application } from "fixtures/common/application";
import { SalesPortalServices } from "../../api/services";
import { generateNewProduct } from "../../data/products/productGeneration";
import { Users } from "../../utils/entities";
import { expect } from "./services.fixture";
import { HTTP_STATUS_CODES } from "../../data/http/statusCodes";
import { IProductFromResponse } from "../../types/products/product.types";
import map from "../../utils/array/map";
import { keyMapper } from "../../utils/mapper";
import { IChipsFilterOptions } from "../../ui/pages/products/productsList.page";
import forEach from "../../utils/array/forEach";

interface PageFactoryFixture {
  salesPortal: Application;
  services: SalesPortalServices;

}

export const baseFixture = base.extend<PageFactoryFixture>({
  salesPortal: async ({ page }, use) => {
    await use(new Application(page));
  },
  services: async ({}, use) => {
    await use(new SalesPortalServices());
  },
});

export const loggedAsAdmin = baseFixture.extend({
  salesPortal: async ({ salesPortal }, use) => {
    await salesPortal.signInPage.openSalesPortal();
    await salesPortal.signInPage.signInAsAdmin();
    await use(salesPortal);
  },
});

export const createAndVerifyProductsTableData = loggedAsAdmin.extend<{
  createdProducts: IProductFromResponse[],
  verifyTableData: () => Promise<void>;
  getApiMappedData: () => Promise<any[]>;
  getTableDataAfterFilterAndSearch: (tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) => Promise<Record<string, string>[]>;
}>({
  createdProducts: async ({ services }, use) => {
    const createdProducts: IProductFromResponse[] = [];
    for (let i = 1; i <= 5; i++) {
      const data = generateNewProduct();
      const response = await services.ProductService.create({ data, token: Users.getToken() });
      expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
      createdProducts.push(response.data.Product);
    }
    await use(createdProducts);

    for (const p of createdProducts) {
      await services.ProductService.delete({ token: Users.getToken(), data: { _id: p._id } });
    }
  },

  getApiMappedData: async ({ services }, use) => {
    const getApiMappedData = async () => {
      const allProducts = (await services.ProductService.getAll({ token: Users.getToken() })).data.Products;
      return await map(allProducts, (entity) => {
        // @ts-ignore
        if (entity["price"]) entity["price"] = `$${entity.price}`;
        // @ts-ignore
        return keyMapper(entity, "products");
      });
    };
    await use(getApiMappedData);
  },

  getTableDataAfterFilterAndSearch: async ({}, use) => {
    const getTableDataAfterFilterAndSearch = async (tableData: Record<string, string>[], chipFilters: IChipsFilterOptions) => {
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

    await use(getTableDataAfterFilterAndSearch);
  },

  verifyTableData: async ({ salesPortal, getApiMappedData, getTableDataAfterFilterAndSearch }, use) => {
    const verifyTableData = async () => {
      let expected = await getApiMappedData();
      const chips = await salesPortal.productsListPage.getListOfChipButtons();
      console.log("chips", chips);
      if (chips.search || chips.quickFilters?.length) {
        expected = await getTableDataAfterFilterAndSearch(expected, chips);
      }
      const actual = await salesPortal.productsListPage.parseTable();
      expect(actual.length).toEqual(expected.length);

      for (const e of expected) {
        expect(actual).toContainEqual(e);
      }
    };
    await use(verifyTableData);
  },
});
