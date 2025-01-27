import { expect } from '@playwright/test';
import { generateNewProduct } from '../../data/products/productGeneration';
import { IProductFromResponse, IProduct } from '../../types/products/product.types';
import { validateResponse, validateSchema } from '../../utils/validations/apiValidation';
import { controllers } from '../controllers';
import { productResponseSchema } from '../../data/schema/product.schema';
import signInApiService from './signIn.service';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';

class ProductApiService {
  private createdProducts: IProductFromResponse[] = [];
  constructor(private controller = controllers.products) {}

  @logStep('Create product')
  async create(customData?: Partial<IProduct>, token?: string ) {
    const response = await this.controller.create({
      data: generateNewProduct(customData),
      token: token ?? await signInApiService.getToken()
    });
    validateResponse({ response, status: HTTP_STATUS_CODES.CREATED, IsSuccess: true, ErrorMessage: null });
    validateSchema(response, productResponseSchema);
    this.createdProducts.push(response.data.Product);
    return response.data.Product;
  }

  @logStep('Create {amount} products')
  async populateProducts(amount: number, customData?: Partial<IProduct>, token?: string) {
    const currentProducts: IProductFromResponse[] = [];
    for (let i = 0; i < amount; i++) {
      currentProducts.push(await this.create(customData, token));
    }
    return currentProducts;
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

  async delete(id?: string, token?: string, ) {
    const t = token ?? await signInApiService.getToken();
    if (id) {
      const response = await this.controller.delete({ data: { _id: id }, token: t });
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
      return;
    }

    for (const product of this.createdProducts) {
      const response = await this.controller.delete({ data: { _id: product._id }, token: t });
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  async deleteProductWithName(name: string, token?: string) {
    if (!token) token = await signInApiService.getToken();
    const storedProduct = this.createdProducts.find((p) => p.name === name);
    if (storedProduct) {
      const response = await this.controller.delete({ data: { _id: storedProduct?._id }, token });
      expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
      return;
    }

    const productServer = (await this.controller.getAll({ token }))
      .data.Products.find((p) => p.name === name);
    if (!productServer) {
      throw Error(`Product with name: "${name}" was not found`);
    }

    const response = await this.controller.delete({ data: { _id: productServer?._id }, token });
    expect(response.status).toBe(HTTP_STATUS_CODES.DELETED);
  }

  private findProductIndex(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }
}

export default new ProductApiService();