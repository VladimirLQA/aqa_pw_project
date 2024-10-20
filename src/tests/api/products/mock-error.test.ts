import { expect, mergeTests } from '@playwright/test';
import { test as mocks } from '../../../fixtures/common/api-mock.fixture';
import { test as services } from '../../../fixtures/common/services.fixture';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment';
import { HTTP_STATUS_CODES } from '../../../data/http/statusCodes';
import { generateNewProduct } from '../../../data/products/productGeneration';
import { createdProductSchema } from '../../../data/schema/product.schema';
import { IProductFromResponse } from '../../../types/products/product.types';
import { validateResponseWithSchema } from '../../../utils/validations/apiValidation';
import { apiConfig } from '../../../api/config/apiConfig';

const mergeTest = mergeTests(mocks, services);

mergeTest.describe('[API]. [Products][MOCKS]', () => {
  const createdProducts: IProductFromResponse[] = [];
  let token: string = '';

  mergeTest.beforeAll(async ({ SignInClient }) => {
    const signInResponse = await SignInClient.login({
      data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD },
    });
    token = signInResponse.data.token;
  });

  mergeTest('Create smoke product', async ({ ProductsClient, mock }) => {
    const productData = generateNewProduct();
    // TODO refactor
    const url = apiConfig.endpoints.Products;
    mock.modifyResponse({
      url,
      method: 'POST',
      body: { test: 'hello' },
      statusCode: HTTP_STATUS_CODES.ALREADY_EXISTS,
    });

    const productResponse = await ProductsClient.create(
      { data: productData, token },
    );
    console.log('productResponse', productResponse);
    createdProducts.push(productResponse.data.Product);

    // validateResponseWithSchema({
    //   response: productResponse,
    //   schema: createdProductSchema,
    //   status: HTTP_STATUS_CODES.CREATED,
    //   IsSuccess: true,
    //   ErrorMessage: null,
    // });
    // expect(productResponse.data.Product).toMatchObject({
    //   ...productData,
    //   _id: productResponse.data.Product._id,
    // });
  });

  mergeTest.afterAll(async ({ ProductsClient }) => {
    for (const product of createdProducts) {
      await ProductsClient.delete({ data: { _id: product._id }, token });
    }
  });
});
