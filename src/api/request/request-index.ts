import { BaseApiClient } from 'api/request/request-base';
import requestApiClient from 'api/request/pw-request';

const clients: Record<string, BaseApiClient> = {
  request: requestApiClient,
};

export default clients[process.env.API_CLIENT || 'request'];
