import { test } from 'fixtures/common/api-controllers.fixture';
import { validateResponse, validateResponseWithSchema } from 'utils/validations/apiValidation';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import signInService from '../../../api/services/signIn.service';
import { expect } from '@playwright/test';
import { omit } from '../../../utils/utils';
import { ICustomer, ICustomerFromResponse } from '../../../types/customers/customers.types';
import { generateNewCustomer } from '../../../data/customers/generateNewCustomer';
import { customerResponseSchema } from '../../../data/schema/customers.schema';

test.describe.configure({ mode: 'serial' });

test.describe('[API] [Customers] [CRUD]', () => {
  let createdCustomer: ICustomerFromResponse, updatedCustomer: ICustomer;
  let token: string;

  test.beforeAll('Prepare token', async () => {
    token = await signInService.signInAsAdminApi();
  });

  test('Should create customer', async ({ CustomersController }) => {
    const customerData = generateNewCustomer();
    const customerResponse = await CustomersController.create({ data: customerData, token });
    createdCustomer = customerResponse.data.Customer;

    validateResponseWithSchema({
      response: customerResponse,
      schema: customerResponseSchema,
      status: HTTP_STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(customerResponse.data.Customer).toMatchObject({
      ...customerData,
      _id: customerResponse.data.Customer._id,
    });
  });

  test(`Should get creted customer by customer id`, async ({ CustomersController }) => {
    const customerResponse = await CustomersController.getById({ data: { _id: createdCustomer._id }, token });
    validateResponseWithSchema({
      response: customerResponse,
      schema: customerResponseSchema,
      status: HTTP_STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(createdCustomer).toMatchObject({ ...customerResponse.data.Customer });
  });

  test('Should update customer', async ({ CustomersController }) => {
    updatedCustomer = { ...omit(createdCustomer, ['createdOn', '_id']),  ...generateNewCustomer() };
    const customerResponse = await CustomersController
      .update({ data: { _id: createdCustomer._id, body: updatedCustomer }, token });

    validateResponseWithSchema({
      response: customerResponse,
      schema: customerResponseSchema,
      status: HTTP_STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(customerResponse.data.Customer).toMatchObject({ ...updatedCustomer });
  });

  test('Should delete customer', async ({ CustomersController }) => {
    const customerResponse = await CustomersController.delete({ data: { _id: createdCustomer._id }, token });
    validateResponse({
      response: customerResponse,
      status: HTTP_STATUS_CODES.DELETED,
    });
  });

  test(`Should get error trying to get deleted customer`, async ({ CustomersController }) => {
    const customerResponse = await CustomersController.getById({ data: { _id: createdCustomer._id }, token });
    validateResponse({
      response: customerResponse,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      IsSuccess: false,
      ErrorMessage: null
    });
  });

});
