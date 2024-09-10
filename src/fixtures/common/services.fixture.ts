import { test as base } from '@playwright/test';
import { ApiClients } from 'api/clients/index';
import signInClient from '../../api/clients/signIn.client';
import productClient from '../../api/clients/product.client';
import customerClient from '../../api/clients/customer.client';

export const test = base.extend<ApiClients>({
  SignInClient: async ({}, use) => {
    await use(signInClient);
  },

  ProductsClient: async ({}, use) => {
    await use(productClient);
  },

  CustomersClient: async ({}, use) => {
    await use(customerClient);
  },
});
