import { RequestParams, Id, IRequestOptions  } from '../../types/api/apiClient.types';
import { IOrderResponseData, IOrdersResponseData, IOrdersRequest, ICommentRequest, IOrderStatusRequest, IOrderDeliveryRequest } from '../../types/orders/order.types';
import { apiConfig } from '../config/apiConfig';
import apiClient from 'api/request/request-index';

class OrdersController {
  constructor(private client = apiClient) { }

  async getByID(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Get Order By Id'](params.data!._id),
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async getAll(params: RequestParams<unknown>) {
    const options: IRequestOptions = {
      method: 'GET',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Orders,
      headers: { 'Content-Type': 'application/json', Authorization: params.token },
    };
    return this.client.sendRequest<IOrdersResponseData>(options);
  }

  async createOrder(params: RequestParams<IOrdersRequest>) {
    const options: IRequestOptions = {
      method: 'POST',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Orders,
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async updateOrder(params: RequestParams<IOrdersRequest>) {
    const options: IRequestOptions = {
      method: 'PUT',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Orders,
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async delete(params: Required<RequestParams<Id>>) {
    const options: IRequestOptions = {
      method: 'DELETE',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Get Order By Id'](params.data._id),
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
    };
    return this.client.sendRequest<null>(options);
  }

  async addComment(params: RequestParams<ICommentRequest>) {
    const options: IRequestOptions = {
      method: 'POST',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Order Comments'],
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async deleteComment(params: RequestParams<ICommentRequest>) {
    const options: IRequestOptions = {
      method: 'PUT',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Order Comments'],
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async updateOrderStatus(params: RequestParams<IOrderStatusRequest>) {
    const options: IRequestOptions = {
      method: 'PUT',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Order Status'],
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest(options);
  }

  async delivery(params: RequestParams<IOrderDeliveryRequest>) {
    const options: IRequestOptions = {
      method: 'POST',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Order Delivery'],
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async receive(params: RequestParams<Partial<IOrdersRequest>>) {
    const options: IRequestOptions = {
      method: 'POST',
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Order Receive'],
      headers: { Authorization: params.token, 'Content-Type': 'application/json' },
      data: params.data,
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }
}

export default new OrdersController();
