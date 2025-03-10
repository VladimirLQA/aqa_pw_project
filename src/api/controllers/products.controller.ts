import { IRequestOptions, Id, RequestParams, TBody } from 'types/api/apiClient.types';
import { IProduct, IProductResponse, IProductsResponse, } from 'types/products/product.types';
import { apiConfig } from 'api/config/apiConfig';
import apiClient from 'api/request/request-index';
import { logStep } from 'utils/reporter/decorators/logStep';

class ProductsController {
  constructor(private client = apiClient) {}

  @logStep('Get product via API')
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Product By Id'](params.data!._id),
      baseURL: apiConfig.baseURL,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Get all products via API')
  async getAll(params: Partial<RequestParams<Id>>) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseURL,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: params.token! },
    };
    return this.client.sendRequest<IProductsResponse>(options);
  }

  @logStep('Create product via API')
  async create(params: RequestParams<IProduct>) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseURL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
      data: params.data,
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Update product via API')
  async update(params: RequestParams<Id & TBody<IProduct>>) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Product By Id'](params.data!._id!),
      baseURL: apiConfig.baseURL,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
      data: params.data?.body,
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Delete product via API')
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Product By Id'](params.data!._id),
      baseURL: apiConfig.baseURL,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<null>(options);
  }
}

export default new ProductsController();
