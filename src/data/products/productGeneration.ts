import { faker } from '@faker-js/faker';
import { IProduct, MANUFACTURERS } from '../../types/products/product.types';
import { getRandomObjectValue } from '../../utils/object';

export function generateNewProduct(customProductFields?: Partial<IProduct>) {
  const product: IProduct = {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    manufacturer: getRandomObjectValue<typeof MANUFACTURERS>(MANUFACTURERS),
    notes: faker.string.alpha({ length: { min: 5, max: 250 }, casing: 'mixed' }),
    ...customProductFields,
  };
  return product;
};
