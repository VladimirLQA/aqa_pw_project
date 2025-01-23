import { faker } from '@faker-js/faker';
import { IProduct, MANUFACTURERS } from '../../types/products.types.js';
import { TestDataFor } from '../../types/common.types.js';

export const productData: TestDataFor<IProduct> = {
  valid: {
    name: [
      {
        name: faker.string.alpha(40),
        description: '40 symbols value',
      },
      {
        name: faker.string.alpha(3),
        description: '3 symbols value',
      },
      {
        name: faker.string.alpha({ casing: 'upper', length: 4 }),
        description: 'Upper case only',
      },
      {
        name: faker.string.alpha(3) + ' ' + faker.string.alpha(4),
        description: 'Value with 1 space',
      },
    ],
    price: [
      {
        price: 1,
        description: 'Min value',
      },
      {
        price: 99999,
        description: 'Max value',
      },
      {
        price: 332,
        description: 'Average value',
      },
    ],
    manufacturer: [
      {
        manufacturer: MANUFACTURERS.GOOGLE,
        description: 'One of the default value',
      },
      {
        manufacturer: MANUFACTURERS.TESLA,
        description: 'One of the default value',
      },
    ],
    amount: [
      {
        amount: 0,
        description: 'Min value - 0',
      },
      {
        amount: 999,
        description: 'Max value - 999',
      },
      {
        amount: 36,
        description: 'Average value',
      },
    ],
    notes: [
      {
        notes: '',
        description: 'Empty string',
      },
      {
        notes: faker.string.alpha({ length: 250, casing: 'mixed' }),
        description: '250 symbols value: string (upper, lower)',
      },
      {
        notes: '!@#$%^&&*()_-++=.?,\\}{po[]',
        description: 'Special characters except "<>"',
      },
      {
        notes: 'Нотатки продукту',
        description: 'cyrillic value',
      },
    ],
  },
  invalid: {
    name: [
      {
        name: '',
        description: 'Empty value',
      },
      {
        name: faker.string.alpha(3) + '  ' + faker.string.alpha(2),
        description: 'Value with two spaces in a row',
      },
      {
        name: faker.string.alpha(2),
        description: '2 symbols value',
      },
      {
        name: faker.string.alpha(41),
        description: '41 symbols value',
      },
      {
        name: 'Назва продукту',
        description: 'cyrillic value',
      },
      {
        name: faker.number.int({ min: 100, max: 333 }),
        description: 'integer value',
      },
      {
        name: faker.string.alpha({ length: 5 }) + '!/',
        description: 'value with special character',
      },
    ],
    price: [
      { price: 0, description: '0 value' },
      { price: 100000, description: '6 digits value' },
      { price: faker.number.float({ min: 2, max: 11 }), description: 'Float value' },
      { price: -2, description: 'negative value' },
      { price: '1', description: 'string value' },
    ],
    manufacturer: [
      { manufacturer: faker.string.alpha({ length: 7 }), description: 'value is not in the list of allowed values' },
      { manufacturer: faker.number.int({ min: 10, max: 100 }), description: 'integer value' },
      { manufacturer: '', description: 'empty value' },
    ],
    amount: [
      { amount: -1, description: 'negative value' },
      { amount: 1000, description: '4 digits value' },
      { amount: faker.number.float({ min: 2, max: 11 }), description: 'Float value' },
      { amount: '1', description: 'string value' },
    ],
    notes: [
      { notes: faker.number.int({ min: 10, max: 100 }), description: 'integer value' },
      {
        notes: faker.string.alpha(251),
        description: '251 symbols value',
      },
      { notes: faker.string.alpha(5) + '<>', description: 'forbidden symbols in value "<>"' },
    ],
  },
};
