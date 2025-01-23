import { COUNTRIES } from './customers/customers.types';
import { ORDER_STATUSES } from './orders/order.types';
import { MANUFACTURERS } from './products/product.types';

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export type TListPageNames = 'Products';
export type TGetObjectValues<T> = T[keyof T];
export type GenericID<T extends { _id: string} = any> = T[];

export type ActionButtons = 'Delete' | 'Details' | 'Edit';

export type UnionFilterModalLabels = MANUFACTURERS | ORDER_STATUSES | COUNTRIES;

export interface IChipsFilterOptions {
  search?: string;
  quickFilters?: string[];
}

export enum VALIDATION_ERROR_MESSAGES {
  CUSTOMER_NAME = `Customer's name should contain only 1-40 alphabetical characters and one space between`,
  CITY = `City's name should contain only 1-20 alphabetical characters and one space between`,
  ADDRESS = `Address should contain only 1-20 alphanumerical characters and one space between`,
  STREET = `Street should contain only 1-40 alphanumerical characters and one space between`,
  HOUSE = 'House number should be in range 1-999',
  FLAT = 'Flat number should be in range 1-9999',
  EMAIL = 'Invalid Email Address',
  PHONE = 'Mobile Number should be at least 10 characters and start with a +',
  NOTES = 'Notes should be in range 0-250 and without < or > symbols',
  PRODUCTS_NAME = "Products's name should contain only 3-40 alphanumerical characters and one space between",
  AMOUNT = 'Amount should be in range 0-999',
  PRICE = 'Price should be in range 1-99999',
  COUNTRY = 'No such country is defined',
  MANUFACTURER = 'No such manufacturer is defined',
  CUSTOMER = 'Incorrect Customer',
  PRODUCT = 'Incorrect Product',
  DELIVERY = 'Incorrect Delivery',
  INCORRECT_BODY = 'Incorrect request body',
  COMMENT_NOT_FOUND = 'Comment was not found',
}

export interface IInitObject {
  [key: string]: string;
}

export type ValidInvalid = 'valid' | 'invalid';

export type DataItemFor<T> = {
  [K in keyof T]?: any;
} & { description: string };

export type TestDataFor<T> = Record<ValidInvalid, Record<keyof T, DataItemFor<T>[]>>;