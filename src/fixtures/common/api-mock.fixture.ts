import { test as base } from '@playwright/test';
import { apiConfig } from '../../api/config/apiConfig';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';

const nock = require('nock');

export class ApiMock {
  constructor(private mockClient = nock) {}

  public async modifyResponse<T>(opt: {
    url: string,
    method: 'POST' | 'PUT',
    body: T,
    statusCode: typeof HTTP_STATUS_CODES[keyof typeof HTTP_STATUS_CODES],
  }) {
    const {
      url, method, body, statusCode,
    } = opt;

    this.mockClient(apiConfig.baseURL)
      .intercept(url, method ?? 'GET')
      .reply(statusCode, { hello: 'world' });
  }
}

interface ApiMockFixture {
  mock: ApiMock;
}

export const test = base.extend<ApiMockFixture>({
  mock: async ({}, use) => {
    await use(new ApiMock());
  },
});
