import signInController from './signIn.controller';
import productsController from './products.controller';
import customersController from './customers.controller';

export interface ApiControllers {
  SignInController: typeof signInController;
  ProductsController: typeof productsController;
  CustomersController: typeof customersController;
}

export const controllers = {
  products: productsController,
  customers: customersController,
  signIn: signInController,
};

export type DataControllers = Omit<typeof controllers, 'signIn'>;
