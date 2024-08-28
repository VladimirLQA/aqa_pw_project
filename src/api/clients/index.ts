import productClient from 'api/clients/product.client';
import signInClient from 'api/clients/signIn.client';

export interface ApiClients {
  SignInClient: typeof signInClient;
  ProductsClient: typeof productClient;
}

export type TClients = typeof productClient;

export const clients: Record<string, TClients> = {
  products: productClient,
};
