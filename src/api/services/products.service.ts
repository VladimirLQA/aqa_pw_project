import { expect } from '@playwright/test';
import { STATUS_CODES } from 'http';
import { generateNewProduct } from '../../data/products/productGeneration';
import { IProductFromResponse, IProduct } from '../../types/products/product.types';
import { validateResponse, validateSchema } from '../../utils/validations/apiValidation';
import { controllers } from '../controllers';
import { productResponseSchema } from '../../data/schema/product.schema';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import signInApiService from './signIn.service';

class ProductApiService {
  private createdProducts: IProductFromResponse[] = [];
  constructor(private controller = controllers.products) {}

  async create(token: string, customData?: Partial<IProduct>) {
    const response = await this.controller.create({ data: generateNewProduct(customData), token });
    validateResponse({ response, status: HTTP_STATUS_CODES.CREATED, IsSuccess: true, ErrorMessage: null });
    validateSchema(response, productResponseSchema);
    this.createdProducts.push(response.data.Product);
    return response.data.Product;
  }

  getCreatedProduct(id?: string) {
    if (!this.createdProducts.length) throw new Error('No product was created');
    if (id) {
      const foundProduct = this.createdProducts[this.findProductIndex(id)];
      if (!foundProduct) throw new Error('No product was found');
      return foundProduct;
    }
    const foundProduct = this.createdProducts.at(-1) as IProductFromResponse;
    return foundProduct;
  }

  removeStoredProduct(id?: string) {
    const index = id ? this.findProductIndex(id) : this.createdProducts.length - 1;
    this.createdProducts.splice(index, 1);
  }

  async delete(token: string, id?: string) {
    if (id) {
      const response = await this.controller.delete({ data: { _id: id }, token });
      expect(response.status).toBe(STATUS_CODES.DELETED);
      return;
    }

    for (const product of this.createdProducts) {
      const response = await this.controller.delete({ data: { _id: product._id }, token });
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  async deleteProductWithName(name: string, token?: string) {
    if (!token) token = await signInApiService.getToken();
    const storedProduct = this.createdProducts.find((p) => p.name === name);
    if (storedProduct) {
      const response = await this.controller.delete({ data: { _id: storedProduct?._id }, token });
      expect(response.status).toBe(STATUS_CODES.DELETED);
      return;
    }

    const productServer = (await this.controller.getAll({ token }))
      .data.Products.find((p) => p.name === name);
    if (!productServer) {
      throw Error(`Product with name: "${name}" was not found`);
    }

    const response = await this.controller.delete({ data: { _id: productServer?._id }, token });
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  private findProductIndex(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }
}

export default new ProductApiService();