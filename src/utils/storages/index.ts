import { LoggedInUsersSingleton } from 'utils/storages/loggedInUsers';
import { ICustomerFromResponse } from '../../types/customers/customers.types';
import { StorageSingleton } from './abstract.storage';
import { IProductFromResponse } from '../../types/products/product.types';
import { IOrderFromResponse } from '../../types/orders/order.types';

export const CustomersStorageSingleton = new StorageSingleton<ICustomerFromResponse>();
export const ProductsStorageSingleton = new StorageSingleton<IProductFromResponse>();
export const OrdersStorageSingleton = new StorageSingleton<IOrderFromResponse>();
export const UsersStorageSingleton = new LoggedInUsersSingleton();
