import { test } from 'fixtures/common/api-controllers.fixture';
import { HTTP_STATUS_CODES } from '../../../data/http/statusCodes';
import { productsResponseSchema } from '../../../data/schema/product.schema';
import { validateResponseWithSchema } from '../../../utils/validations/apiValidation';
import { expect } from '@playwright/test';

test(`Should get all products`, async ({ ProductsController }) => {
  const productResponse = await ProductsController.getAll({ token });
  validateResponseWithSchema({
    response: productResponse,
    schema: productsResponseSchema,
    status: HTTP_STATUS_CODES.OK,
    IsSuccess: false,
    ErrorMessage: null
  });

  expect(productResponse.data.Products.length).toBeGreaterThan(1);
});