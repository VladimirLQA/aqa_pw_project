import apiClient from 'api/request/request-index';
import { apiConfig } from '../config/apiConfig';
import { IRequestOptions, RequestParams } from '../../types/api/apiClient.types';
import {
  ICustomer,
  ICustomerFromResponse,
  ICustomerResponse,
  ICustomersResponse,
} from '../../types/customers/customers.types';
import { logStep } from '../../utils/reporter/decorators/logStep';

class CustomersClient {
  constructor(private client = apiClient) { }

  @logStep('Create customer via API')
  async create(customer: ICustomer, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'post',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        data: customer,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get customer by id via API')
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Get Customer By Id'](id),
      options: {
        method: 'get',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Get all customers via API')
  async getAll(token: string) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'get',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomersResponse>(options);
  }

  @logStep('Update customer via API')
//  data: ICustomer & { _id: string }, token: string
  async update(params: RequestParams<ICustomerFromResponse>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Customers,
      options: {
        method: 'put',
        headers: {
          Authorization: params.token,
          'Content-Type': 'application/json',
        },
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest<ICustomerResponse>(options);
  }

  @logStep('Delete customer via API')
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Get Customer By Id'](id),
      options: {
        method: 'delete',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<null>(options);
  }
}

export default new CustomersClient();
