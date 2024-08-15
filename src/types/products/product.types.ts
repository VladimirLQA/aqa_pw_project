import { TGetObjectValues } from '../common.types';

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  notes?: string;
  manufacturer: TGetObjectValues<typeof MANUFACTURERS>;
}

export const manufacturerNames = ['Apple', 'Samsung', 'Google', 'Microsoft',
  'Sony', 'Xiaomi', 'Amazon', 'Tesla'] as const;

export const MANUFACTURERS = {
  APPLE: 'APPLE',
  SAMSUNG: 'SAMSUNG',
  GOOGLE: 'Google',
  MICROSOFT: 'Microsoft',
  SONY: 'Sony',
  XIAOMI: 'Xiaomi',
  AMAZON: 'Amazon',
  TESLA: 'Tesla',
};

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse {
  Product: IProductFromResponse;
}

export interface IProductsResponse {
  Products: IProductFromResponse[];
}
