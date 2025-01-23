import { IResponse } from '../api/apiClient.types';
import { ICustomerFromResponse, COUNTRIES } from '../customers/customers.types';
import { IProductFromResponse } from '../products/product.types';

export enum LOCATION_TYPE {
  HOME = 'Home',
  OTHER = 'Other',
}

export enum DELIVERY {
  DELIVERY = 'Delivery',
  PICK_UP = 'Pickup',
}

export enum ORDER_STATUSES {
  DRAFT = 'Draft',
  IN_PROCESS = 'In Process',
  PARTIALLY_RECEIVED = 'Partially Received',
  RECEIVED = 'Received',
  CANCELED = 'Canceled',
}

export enum ORDER_HISTORY_ACTIONS {
  CREATED = 'Order created',
  CUSTOMER_CHANGED = 'Customer changed',
  REQUIRED_PRODUCTS_CHANGED = 'Requested products changed',
  PROCESSED = 'Order processing started',
  DELIVERY_SCHEDULED = 'Delivery Scheduled',
  DELIVERY_EDITED = 'Delivery Edited',
  RECEIVED = 'Received',
  RECEIVED_ALL = 'All products received',
  CANCELED = 'Order canceled',
}

export interface IComment {
  createdOn: string;
  text: string;
  _id: string;
}

export interface IAddress {
  city: string;
  country: string | COUNTRIES;
  flat: number;
  house: number;
  street: string;
}

export interface IDelivery {
  condition: DELIVERY | null;
  finalDate: string;
  address: Partial<IAddress>;
}

export type IDeliveryWithLocation = IDelivery & { location: LOCATION_TYPE };

export interface IHistory {
  action: ORDER_HISTORY_ACTIONS;
  changedOn: string;
  customer: string;
  delivery: IDelivery | null;
  products: (Omit<IProductFromResponse, 'createdOn'> & { received: string })[];
  status: ORDER_STATUSES;
  total_price: number;
}

export interface IOrder {
  comments: [] | IComment[];
  createdOn: string;
  customer: ICustomerFromResponse;
  delivery: IDelivery;
  history: IHistory[];
  products: IProductFromResponse[];
  // products: (Omit<IProductFromResponse, 'createdOn'> & { received: string })[];
  status: ORDER_STATUSES;
  total_price: number;
  _id: string;
}

export interface ScheduleInfo extends IAddress {
  location: LOCATION_TYPE;
  delivery: DELIVERY;
  finalDate: string;
}

export const orderStatusesArray = [
  ORDER_STATUSES.CANCELED,
  ORDER_STATUSES.DRAFT,
  ORDER_STATUSES.RECEIVED,
  ORDER_STATUSES.PARTIALLY_RECEIVED,
  ORDER_STATUSES.IN_PROCESS,
];

export type HeaderDetailsTitles = 'Order Status' | 'Total Price' | 'Delivery';

export interface IOrderHistoryPreviousUpdated {
  previous: string;
  updated: string;
}

export interface IDeliveryScheduleHistory {
  city: IOrderHistoryPreviousUpdated;
  country: IOrderHistoryPreviousUpdated;
  'delivery date': IOrderHistoryPreviousUpdated;
  'delivery type': IOrderHistoryPreviousUpdated;
  flat: IOrderHistoryPreviousUpdated;
  house: IOrderHistoryPreviousUpdated;
  street: IOrderHistoryPreviousUpdated;
}

export interface IOrderId {_id?: string;}

export interface IOrdersRequest extends IOrderId {
  customer: string;
  products: string[];
}

export interface IOrderFromResponse extends IOrder {readonly _id: string;}

export interface IOrderResponseData extends IResponse {Order: IOrderFromResponse;}

export interface IOrdersResponseData extends IResponse {Orders: IOrderFromResponse[];}

export interface ICommentRequest extends IOrderId {
  comments: {
    text?: string;
    _id?: string;
  };
}

export interface IOrderStatusRequest extends IOrderId {status: ORDER_STATUSES;}

export interface IOrderDeliveryRequest extends IOrderId {delivery: IDelivery;}

export interface IOrderData {
  orderId: string;
  customerId: string;
  productsId: string[];
}

export interface IOrderCreationData<T extends ORDER_STATUSES> {
  status: T;
  customer: ICustomerFromResponse;
  products: IProductFromResponse[];
  delivery: T extends ORDER_STATUSES.DRAFT | ORDER_STATUSES.CANCELED
    ? IDelivery | DELIVERY | undefined : IDelivery | DELIVERY;
}
