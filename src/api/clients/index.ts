import productClient from 'api/clients/product.client';
import signInClient from 'api/clients/signIn.client';
import customerClient from 'api/clients/customer.client';

export interface ApiClients {
  SignInClient: typeof signInClient;
  ProductsClient: typeof productClient;
  CustomersClient: typeof customerClient;
}

export const clients = {
  products: productClient,
  customers: customerClient,
  signIn: signInClient,
};

export type DataClients = Omit<typeof clients, 'signIn'>;
