import { IRequestOptions, Id, RequestParams } from 'types/api/apiClient.types';
import { IProduct, IProductFromResponse, IProductResponse, IProductsResponse, } from 'types/products/product.types';
import { apiConfig } from 'api/config/apiConfig';
import apiClient from 'api/request/request-index';
import { logStep } from 'utils/reporter/decorators/logStep';
import { UsersStorage } from '../../utils/storages';
import signInService from '../services/signIn.service';

class ProductsClient {
  constructor(private client = apiClient, private userStorage = UsersStorage) { }

  @logStep('Get product via API')
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Product By Id'](params.data!._id),
      options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Get all products via API')
  async getAll(params: Partial<RequestParams<Id>>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<IProductsResponse>(options);
  }

  @logStep('Create product via API')
  async create(params: RequestParams<IProduct>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Update product via API')
  async update(params: RequestParams<IProductFromResponse>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Products,
      options: {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<IProductResponse>(options);
  }

  @logStep('Delete product via API')
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Product By Id'](params.data!._id),
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<null>(options);
  }
}

export default new ProductsClient();
