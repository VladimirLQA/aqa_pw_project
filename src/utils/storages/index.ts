import { LoggedInUsers } from 'utils/storages/loggedInUsers';
import { ICustomerFromResponse } from '../../types/customers/customers.types';
import { Storage } from './abstract.storage';
import { IProductFromResponse } from '../../types/products/product.types';
import { IOrderFromResponse } from '../../types/orders/order.types';
// TODO abstract storage

export const CustomersStorage = new Storage<ICustomerFromResponse>();
export const ProductsStorage = new Storage<IProductFromResponse>();
export const OrdersStorage = new Storage<IOrderFromResponse>();
// const Products = new CreatedProducts();
export const UsersStorage = new LoggedInUsers();
