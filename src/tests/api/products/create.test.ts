import { generateNewProduct } from 'data/products/productGeneration';
import { test } from 'fixtures/common/api-controllers.fixture';
import { IProduct, IProductFromResponse } from 'types/products/product.types';
import { validateResponse, validateResponseWithSchema } from 'utils/validations/apiValidation';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { productResponseSchema } from '../../../data/schema/product.schema';
import signInService from '../../../api/services/signIn.service';
import { expect } from '@playwright/test';
import { omit } from '../../../utils/utils';

test.describe.configure({ mode: 'serial' });

test.describe('[API] [Products] [CRUD]', () => {
  let createdProduct: IProductFromResponse, updatedProduct: IProduct;
  let token: string;

  test.beforeAll('Prepare token', async () => {
    token = await signInService.signInAsAdminApi();
  });

  test('Should create product', async ({ ProductsController }) => {
    const productData = generateNewProduct();
    const productResponse = await ProductsController.create({ data: productData, token });
    createdProduct = productResponse.data.Product;

    validateResponseWithSchema({
      response: productResponse,
      schema: productResponseSchema,
      status: HTTP_STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(productResponse.data.Product).toMatchObject({
      ...productData,
      _id: productResponse.data.Product._id,
    });
  });

  test(`Should get creted product by product id`, async ({ ProductsController }) => {
    const productResponse = await ProductsController.getById({ data: { _id: createdProduct._id }, token });
    validateResponseWithSchema({
      response: productResponse,
      schema: productResponseSchema,
      status: HTTP_STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(createdProduct).toMatchObject({ ...productResponse.data.Product });
  });

  test('Should update product', async ({ ProductsController }) => {
    updatedProduct = { ...omit(createdProduct, ['createdOn', '_id']),  ...generateNewProduct() };
    const productResponse = await ProductsController
      .update({ data: { _id: createdProduct._id, body: updatedProduct }, token });

    validateResponseWithSchema({
      response: productResponse,
      schema: productResponseSchema,
      status: HTTP_STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(productResponse.data.Product).toMatchObject({ ...updatedProduct });
  });

  test('Should delete product', async ({ ProductsController }) => {
    const productResponse = await ProductsController.delete({ data: { _id: createdProduct._id }, token });
    validateResponse({
      response: productResponse,
      status: HTTP_STATUS_CODES.DELETED,
    });
  });

  test(`Should get error trying to get deleted product`, async ({ ProductsController }) => {
    const productResponse = await ProductsController.getById({ data: { _id: createdProduct._id }, token });
    validateResponse({
      response: productResponse,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      IsSuccess: false,
      ErrorMessage: null
    });
  });

});
