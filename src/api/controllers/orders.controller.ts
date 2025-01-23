import { ContentType } from 'allure-js-commons';
import { RequestOptions } from 'http';
import { RequestParams, Id, IRequestOptions } from '../../types/api/apiClient.types';
import { IOrderResponseData, IOrdersResponseData, IOrdersRequest, ICommentRequest, IOrderStatusRequest, IOrderDeliveryRequest } from '../../types/orders/order.types';
import { apiConfig } from '../config/apiConfig';
import signInService from '../services/signIn.service';
import { OrdersStorage } from '../../utils/storages';
import apiClient from 'api/request/request-index';

class OrdersController {
  constructor(private client = apiClient, private ordersStorage = OrdersStorage) { }

  async get(params: RequestParams<Id>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints['Get Order By Id'](params.data!._id),
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: params.token ?? await signInService.getToken() },
      },
      requestType: 'json',
    };
    return this.client.sendRequest<IOrderResponseData>(options);
  }

  async getAll(params: Partial<RequestParams<unknown>>) {
    const options: RequestOptions = {
      method: 'GET',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${params.token}` },
    };
    return Request.sendRequest<IOrdersResponseData>(options);
  }

  async createOrder(params: RequestParams<IOrdersRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async updateOrder(params: RequestParams<IOrdersRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orders,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async delete(params: Required<RequestParams<Id>>) {
    const options: RequestOptions = {
      method: 'DELETE',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderById(params.data._id),
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
    };
    return Request.sendRequest<null>(options);
  }

  async addComment(params: RequestParams<ICommentRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async deleteComment(params: RequestParams<ICommentRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderComment,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async updateOrderStatus(params: RequestParams<IOrderStatusRequest>) {
    const options: RequestOptions = {
      method: 'PUT',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderStatus,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest(options);
  }

  async delivery(params: RequestParams<IOrderDeliveryRequest>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderDelivery,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }

  async receive(params: RequestParams<Partial<IOrdersRequest>>) {
    const options: RequestOptions = {
      method: 'POST',
      baseURL: OrdersEndpoints.baseURL,
      url: OrdersEndpoints.orderReceive,
      headers: { Authorization: `Bearer ${params.token}`, 'Content-Type': ContentType.JSON },
      data: params.data,
    };
    return Request.sendRequest<IOrderResponseData>(options);
  }
}

export default new OrdersController();
