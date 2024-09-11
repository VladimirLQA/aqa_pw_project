import { COUNTRY } from '../../types/customers/customers.types';
import { DELIVERY, ORDER_STATUSES } from '../../types/orders/order.types';
import { MANUFACTURERS } from '../../types/products/product.types';

export const DELIVERY_SCHEMA = {
  type: ['object', 'null'],
  properties: {
    finalDate: { type: 'string' },
    condition: {
      type: ['string', 'null'],
      enum: Object.values(DELIVERY),
    },
    address: {
      type: 'object',
      properties: {
        flat: { type: 'integer' },
        house: { type: 'integer' },
        country: { enum: Object.values(COUNTRY) },
        street: { type: 'string' },
        city: { type: 'string' },
      },
    },
  },
};

export const PRODUCT_SCHEMA = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'The unique identifier for an product',
      },
      name: { type: 'string' },
      amount: { type: 'integer' },
      price: { type: 'integer' },
      manufacturer: { enum: Object.values(MANUFACTURERS) },
      notes: { type: 'string' },
      received: { type: 'boolean' },
    },
  },
};

export const CREATE_ORDER_SCHEMA = {
  type: 'object',
  properties: {
    Order: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'The unique identifier for an order',
        },
        total_price: { type: 'integer' },
        comments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              createdOn: { type: 'string' },
              _id: {
                type: 'string',
                description: 'The unique identifier for a comment',
              },
              text: { type: 'string' },
            },
          },
        },
        createdOn: { type: 'string' },
        history: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              action: { type: 'string' },
              changedOn: { type: 'string' },
              customer: { type: 'string' },
              status: { enum: Object.values(ORDER_STATUSES) },
              total_price: { type: 'integer' },
              products: PRODUCT_SCHEMA,
              delivery: DELIVERY_SCHEMA,
            },
          },
        },
        products: PRODUCT_SCHEMA,
        customer: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier for a customer',
            },
            email: { type: 'string' },
            flat: { type: 'integer' },
            house: { type: 'integer' },
            country: { enum: Object.values(COUNTRY) },
            createdOn: { type: 'string' },
            notes: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            phone: { type: 'string' },
          },
          required: ['_id', 'email', 'flat', 'house', 'country', 'createdOn', 'street', 'city', 'phone'],
        },
        delivery: DELIVERY_SCHEMA,
        status: { enum: ['Draft', 'Partially Received', 'Canceled', 'In Process', 'Received'] },
      },
    },
  },
};
