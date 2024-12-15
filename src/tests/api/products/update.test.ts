import { generateNewProduct } from 'data/products/productGeneration';
import { test } from 'fixtures/common/services.fixture';
import { ADMIN_USERNAME } from 'config/environment';
import { IProductFromResponse } from 'types/products/product.types';
import { validateResponseWithSchema } from 'utils/validations/apiValidation';
import { createdProductSchema } from 'data/schema/product.schema';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { expect } from 'playwright/test';
import signInService from '../../../api/services/signIn.service';

test.describe('[API]. [Products]', () => {
  const createdProducts: IProductFromResponse[] = [];
  let token: string = '';

  test.beforeAll(async ({ ProductsClient }) => {
    token = await signInService.getToken(ADMIN_USERNAME);
    const productResponse = await ProductsClient.create({ data: generateNewProduct(), token });
    createdProducts.push(productResponse.data.Product);
  });

  test('Update smoke product', async ({ ProductsClient }) => {
    const productData = { ...generateNewProduct(), _id: createdProducts[0]._id };
    const response = await ProductsClient.update({ data: productData as IProductFromResponse, token });

    validateResponseWithSchema({
      response, schema: createdProductSchema,
      status: HTTP_STATUS_CODES.OK, IsSuccess: true, ErrorMessage: null
    });
    expect(response.data.Product).toMatchObject(productData);
  });

  test.afterAll(async ({ ProductsClient }) => {
    for (const product of createdProducts) {
      await ProductsClient.delete({ data: { _id: product._id }, token });
    }
  });
});
