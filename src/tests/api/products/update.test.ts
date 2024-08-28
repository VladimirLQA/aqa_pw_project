import { generateNewProduct } from 'data/products/productGeneration';
import { test } from 'fixtures/common/services.fixture';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from 'config/environment';
import { IProductFromResponse } from 'types/products/product.types';
import { validateResponseWithSchema } from 'utils/validations/apiValidation';
import { createdProductSchema } from 'data/schema/product.schema';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { expect } from 'playwright/test';

test.describe('[API]. [Products]', () => {
  const createdProducts: IProductFromResponse[] = [];
  let token: string = '';

  test.beforeAll(async ({ SignInClient, ProductsClient }) => {
    const signInResponse = await SignInClient.login(
      { data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } },
    );
    token = signInResponse.data.token;
    const productData = generateNewProduct();
    const productResponse = await ProductsClient
      .create({ data: productData, token });

    createdProducts.push(productResponse.data.Product);
  });

  test('Update smoke product', async ({ ProductsClient }) => {
    const productData = {
      ...generateNewProduct(),
      _id: createdProducts[0]._id,
    };
    const response = await ProductsClient.update(
      { data: productData as IProductFromResponse, token },
    );

    validateResponseWithSchema(
      response, createdProductSchema, HTTP_STATUS_CODES.OK, true, null,
    );

    expect(response.data.Product).toMatchObject(productData);
  });

  test.afterAll(async ({ ProductsClient }) => {
    for (const product of createdProducts) {
      await ProductsClient.delete({ data: { _id: product._id }, token });
    }
  });
});
