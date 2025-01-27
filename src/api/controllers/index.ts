import signInController from './signIn.controller';
import productsController from './products.controller';
import customersController from './customers.controller';
import ordersController from './orders.controller';

export interface ApiControllers {
  SignInController: typeof signInController;
  ProductsController: typeof productsController;
  CustomersController: typeof customersController;
  OrderssController: typeof ordersController;
}

export const controllers = {
  products: productsController,
  orders: ordersController,
  customers: customersController,
  signIn: signInController,
};

export type DataControllers = Omit<typeof controllers, 'signIn'>;
