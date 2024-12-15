import apiClient from 'api/request/request-index';
import { apiConfig } from '../config/apiConfig';
import { Id, IRequestOptions, RequestParams } from '../../types/api/apiClient.types';
import {
  ICustomer,
  ICustomerFromResponse,
  ICustomerResponse,
  ICustomersResponse,
} from '../../types/customers/customers.types';
import { logStep } from '../../utils/reporter/decorators/logStep';
import signInService from '../services/signIn.service';

class CustomersClient {
  constructor(private client = apiClient) { }

  @logStep('Create customer via API')
  async create(params: RequestParams<ICustomer>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get customer by id via API')
  async getById(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Get Customer By Id'](params.data!._id),
      options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get all customers via API')
  async getAll(params: RequestParams<ICustomerFromResponse>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomersResponse>(options);
  }

  @logStep('Update customer via API')
  async update(params: RequestParams<ICustomerFromResponse>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Delete customer via API')
  async delete(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Get Customer By Id'](params.data!._id),
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<null>(options);
  }
}

export default new CustomersClient();
