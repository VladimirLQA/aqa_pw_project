import { IProduct, IProductFromResponse } from 'types/products/product.types';
import { generateNewProduct } from 'data/products/productGeneration';
import { expect, test as base } from 'fixtures/common/services.fixture';
import { Users } from 'utils/storages';
import { HTTP_STATUS_CODES } from 'data/http/statusCodes';
import { }

interface ProductFixture {
  createProductViaApi: (product?: IProduct, token?: string) => Promise<IProductFromResponse>;
  getProductById: (productId: string, token?: string) => Promise<IProductFromResponse>;
  getAllProducts: (token?: string) => Promise<IProductFromResponse[]>;
  deleteProduct: (productId: string, token?: string) => Promise<void>;
}

export const test = base.extend<ProductFixture>({
  createProductViaApi: async ({ services }, use) => {
    let createdProduct;
    const createdProductViaApi = async (product?: IProduct, token?: string) => {
      const data = generateNewProduct(product);
      const response = await services.ProductService.create({ data, token: token ?? Users.getToken() });
      expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
      createdProduct = response.data.Product;
      return response.data.Product;
    };

    await use(createdProductViaApi);
    if (createdProduct) {
      await services.ProductService.delete({
        data: { _id: (createdProduct as IProductFromResponse)._id },
        token: Users.getToken(),
      });
    }
  },

  getProductById: async ({ services }, use) => {
    const receivedProduct = async (productId: string, token?: string) => {
      const productResponse = await services.ProductService.getById({
        data: { _id: productId },
        token: token ?? Users.getToken(),
      });
      expect(productResponse.status).toBe(HTTP_STATUS_CODES.OK);
      return productResponse.data.Product;
    };
    await use(receivedProduct);
  },

  getAllProducts: async ({ services }, use) => {
    const receivedProducts = async (token?: string) => {
      const productsResponse = await services.ProductService.getAll({ token: token ?? Users.getToken() });
      expect(productsResponse.status).toBe(HTTP_STATUS_CODES.OK);
      return productsResponse.data.Products;
    };
    await use(receivedProducts);
  },

  deleteProduct: async ({ services }, use) => {
    const deletedProduct = async (productId: string, token?: string) => {
      const deleteResponse = await services.ProductService.delete({ data: { _id: productId }, token: token ?? Users.getToken() });
      expect(deleteResponse.status).toBe(HTTP_STATUS_CODES.DELETED);
    };
    await use(deletedProduct);
  },
});
