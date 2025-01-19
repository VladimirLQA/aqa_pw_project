import { TGetObjectValues } from '../common.types';

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  notes?: string;
  manufacturer: TGetObjectValues<typeof MANUFACTURERS>;
}

export const manufacturerNames = [
  'Apple',
  'Samsung',
  'Google',
  'Microsoft',
  'Sony',
  'Xiaomi',
  'Amazon',
  'Tesla',
] as const;

export const MANUFACTURERS = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  GOOGLE: 'Google',
  MICROSOFT: 'Microsoft',
  SONY: 'Sony',
  XIAOMI: 'Xiaomi',
  AMAZON: 'Amazon',
  TESLA: 'Tesla',
} as const;

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse { Product: IProductFromResponse }

export interface IProductsResponse {
  Products: IProductFromResponse[];
}

export type AddProductFields =
  | 'Name input'
  | 'Manufacturer dropdown'
  | 'Price input'
  | 'Amount input'
  | 'Notes textarea';
