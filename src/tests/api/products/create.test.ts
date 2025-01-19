import { generateNewProduct } from 'data/products/productGeneration';
import { test } from 'fixtures/common/services.fixture';
import { IProductFromResponse } from 'types/products/product.types';
import { validateResponseWithSchema } from 'utils/validations/apiValidation';
import { createdProductSchema } from 'data/schema/product.schema';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { expect } from '@playwright/test';
import signInService from '../../../api/services/signIn.service';

test.describe('[API]. [Products]', () => {
  const createdProducts: IProductFromResponse[] = [];
  let token: string;

  test.beforeAll('Prepare token', async () => {
    token = await signInService.signInAsAdminApi();
  });

  test('Create smoke product', async ({ ProductsClient }) => {
    const productData = generateNewProduct();
    const productResponse = await ProductsClient.create(
      { data: productData, token },
    );
    createdProducts.push(productResponse.data.Product);
    validateResponseWithSchema({
      response: productResponse,
      schema: createdProductSchema,
      status: HTTP_STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(productResponse.data.Product).toMatchObject({
      ...productData,
      _id: productResponse.data.Product._id,
    });
  });

  test.afterAll(async ({ ProductsClient }) => {
    for (const product of createdProducts) {
      await ProductsClient.delete({ data: { _id: product._id }, token });
    }
  });
});
