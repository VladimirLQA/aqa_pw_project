import productService from 'api/services/product.service';
import signInService from 'api/services/signIn.service';
import ProductService from 'api/services/product.service';
import SignInService from 'api/services/signIn.service';

export class SalesPortalServices {
  SignInService = signInService;

  ProductService = productService;
}

export const services: Record<string, Services> = {
  products: productService,
};

export type Services = typeof ProductService;
