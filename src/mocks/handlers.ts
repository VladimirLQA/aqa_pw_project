import { http, HttpResponse } from 'msw';
import { apiConfig } from '../api/config/apiConfig';

export const handlers = [
  http.post(
    apiConfig.baseURL + apiConfig.endpoints.Products,
    ({ request, params, cookies }) =>
    // ...and respond to them using this JSON response.
      HttpResponse.json({
        hello: 'test',
      }),
  ),
];
