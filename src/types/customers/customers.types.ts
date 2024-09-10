import { TGetObjectValues } from '../common.types';
import { IResponseFields } from '../api/apiClient.types';

export interface ICustomer {
  email: string;
  name: string;
  country: TGetObjectValues<typeof COUNTRY>;
  street: string;
  flat: number;
  city: string;
  house: number;
  phone: string;
  notes?: string;
}

export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}

export const COUNTRY = {
  USA: 'USA',
  CANADA: 'Canada',
  BELARUS: 'Belarus',
  UKRAINE: 'Ukraine',
  GERMANY: 'Germany',
  FRANCE: 'France',
  GREATE_BRITAIN: 'Great Britain',
  RUSSIA: 'Russia',
};
