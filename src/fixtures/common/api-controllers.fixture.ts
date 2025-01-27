import { test as base } from '../base.fixture';
import { ApiControllers, controllers } from '../../api/controllers';

const { signIn, customers, products, orders } = controllers;

export const test = base.extend<ApiControllers>({
  SignInController: async ({}, use) => {
    await use(signIn);
  },
  ProductsController: async ({}, use) => {
    await use(products);
  },
  CustomersController: async ({}, use) => {
    await use(customers);
  },
  OrderssController: async ({}, use) => {
    await use(orders);
  },
});
