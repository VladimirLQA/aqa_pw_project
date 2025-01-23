import { MANUFACTURERS } from '../../types/products/product.types';
import { baseSchemaPart } from './base.schema';

export const productResponseSchema = {
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        amount: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        manufacturer: {
          type: 'string',
          enum: Object.values(MANUFACTURERS),
        },
        createdOn: {
          type: 'string',
          // format: "date-time",
        },
        notes: {
          type: 'string',
        },
      },
      required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
      additionalProperties: false,
    },
    ...baseSchemaPart,
  },
  required: ['Product', 'IsSuccess', 'ErrorMessage'],
};

export const productsResponseSchema = {
  type: 'object',
  properties: {
    Products: {
      type: 'array',
      items: {
        properties: {
          _id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          amount: {
            type: 'number',
          },
          price: {
            type: 'number',
          },
          manufacturer: {
            type: 'string',
            enum: Object.values(MANUFACTURERS),
          },
          createdOn: {
            type: 'string',
          // format: "date-time",
          },
          notes: {
            type: 'string',
          },
        },
        required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
        additionalProperties: false,
      },
    },
    ...baseSchemaPart,
  },
  required: ['Products', 'IsSuccess', 'ErrorMessage'],
  additionalProperties: false,
};