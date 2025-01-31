import apiClient from 'api/request/request-index';
import { apiConfig } from '../config/apiConfig';
import { Id, IRequestOptions, RequestParams, TBody } from '../../types/api/apiClient.types';
import {
  ICustomer,
  ICustomerFromResponse,
  ICustomerResponse,
  ICustomersResponse,
} from '../../types/customers/customers.types';
import { logStep } from '../../utils/reporter/decorators/logStep';

class CustomersController {
  constructor(private client = apiClient) { }

  @logStep('Create customer via API')
  async create(params: RequestParams<ICustomer>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Customers,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
      data: params.data,
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get customer by id via API')
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Get Customer By Id'](params.data!._id),
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get all customers via API')
  async getAll(params: RequestParams<ICustomerFromResponse>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      method: 'GET',
      url: apiConfig.endpoints.Customers,
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<ICustomersResponse>(options);
  }

  @logStep('Update customer via API')
  async update(params: RequestParams<Id & TBody<ICustomer>>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Get Customer By Id'](params.data!._id!),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
      data: params.data?.body,
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Delete customer via API')
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Get Customer By Id'](params.data!._id),
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<null>(options);
  }
}

export default new CustomersController();
