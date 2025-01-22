export const keysForMapping: { [key: string]: string } = {
  name: 'Name',
  manufacturer: 'Manufacturer',
  price: 'Price',
  email: 'Email',
  country: 'Country',
  city: 'City',
  street: 'Street',
  house: 'House',
  flat: 'Flat',
  phone: 'Phone',
  notes: 'Notes',
};

export const componentKeys: { [key: string]: string[] } = {
  products: ['name', 'price', 'manufacturer'],
  customers: ['email', 'city', 'country', 'street', 'house', 'flat', 'phone', 'notes'],
};

export const keyMapper = <T extends { [key: string]: any }>(
  data: T,
  pageName: string,
) => {
  const mapped: { [key: string]: string } = {};
  for (const key of componentKeys[pageName]) {
    mapped[keysForMapping[key]] = data[key];
  }
  return mapped;
};
