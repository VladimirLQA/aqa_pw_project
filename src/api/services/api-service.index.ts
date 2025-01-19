import SignInApiService from './signIn.service';
import  CustomersApiService from './customers.service';
import  ProductsApiService  from './products.service';

export const apiServices = {
  customers: CustomersApiService,
  products: ProductsApiService,
  signIn: SignInApiService,
};

