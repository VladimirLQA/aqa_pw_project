import { BaseApiClient } from 'api/request/request-base';
import requestApiClient from 'api/request/pw-request';
import axiosApiClient from 'api/request/axios-request';

const clients: Record<string, BaseApiClient> = {
  request: requestApiClient,
  axios: axiosApiClient,
};

export default clients[process.env.API_CLIENT || 'axios'];
