import { faker } from '@faker-js/faker';
import { getRandomObjectValue } from '../../utils/object/index';
import { COUNTRIES, type ICustomer } from '../../types/customers/customers.types';

export const generateNewCustomer = (customerData?: Partial<ICustomer>) => {
  const customer: ICustomer = {
    name: faker.person.firstName(),
    flat: faker.number.int({ min: 1, max: 99 }),
    house: faker.number.int({ min: 0, max: 99 }),
    city: faker.location.city(),
    notes: 'Test notes',
    street: faker.location.street(),
    phone: `+${faker.string.numeric({ length: 12 })}`,
    email: faker.internet.email({ allowSpecialCharacters: false }),
    country: getRandomObjectValue(COUNTRIES),
    ...customerData,
  };
  return customer;
};
