/* eslint-disable max-classes-per-file */

import { Page, test as base } from '@playwright/test';
import { apiConfig } from '../../api/config/apiConfig';
import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { Method } from '../../types/api/apiClient.types';

const nock = require('nock');

export interface MockOptions<T = any> {
  url: string;
  baseURL: string;
  method?: Method;
  body: T;
  statusCode: typeof HTTP_STATUS_CODES[keyof typeof HTTP_STATUS_CODES];
  headers?: Record<string, any>;
  params?: Record<string, any> | URLSearchParams;
}

export abstract class Mock {
  public abstract modifyResponse<T>(options: MockOptions<T>): Promise<void>;
}

export class UIMock extends Mock {
  constructor(private page: Page) {
    super();
  }

  public async modifyResponse<T>(options: MockOptions<T>) {
    const {
      url, body, statusCode, headers, baseURL,
    } = options;
    await this.page.route(`**${url}`, async (route, request) => {
      // if (request.method() === method) {}
      await route.fulfill({
        json: body,
        status: statusCode,
        headers,
      });
    });
  }
}

export class ApiMock extends Mock {
  private mock = nock;

  public async modifyResponse<T>(options: MockOptions<T>): Promise<void> {
    const {
      url, method, body, statusCode, headers, params, baseURL,
    } = options;

    this.mock(baseURL)
      .intercept(url, method)
      .query(params ?? {})
      .reply(statusCode, body, headers ?? {});
  }
}

export class MockOptionsBuilder<T = any> {
  private options: Partial<MockOptions<T>> = {
    baseURL: apiConfig.baseURL,
  };

  withBody(body: T): this {
    this.options.body = body;
    return this;
  }

  withUrl(url: string): this {
    this.options.url = url;
    return this;
  }

  withBaseURL(baseUrl: string): this {
    this.options.baseURL = baseUrl;
    return this;
  }

  withMethod(method: MockOptions<T>['method']): this {
    this.options.method = method;
    return this;
  }

  withStatusCode(code: MockOptions<T>['statusCode']): this {
    this.options.statusCode = code;
    return this;
  }

  withHeaders(headers: Record<string, string>): this {
    this.options.headers = headers;
    return this;
  }

  withParams(params: Record<string, string> | URLSearchParams): this {
    this.options.params = params;
    return this;
  }

  create() {
    return this.options as MockOptions<T>;
  }
}

// class PlaywrightMockBuilder<T> extends MockBuilder<T> {
//   withResponseDelay(ms: number): this {
//     return this;
//   }
// }

// class NockMockBuilder<T> extends MockBuilder<T> {
//   withPersist(persist: boolean): this {
//     return this;
//   }
// }

export class MockService {
  constructor(private mock: Mock) {}

  async modifyResponse<T = any>(options: MockOptions<T>) {
    await this.mock.modifyResponse(options);
  }
}

export interface IMockService {
  mock: MockService;
  isApi: boolean;
}

export const test = base.extend<IMockService>({
  mock: async ({ page }, use) => {
    await use(new MockService(new UIMock(page)));
    // isApi
    //   ? new MockService(new ApiMock())
    //   : new MockService(new UIMock(page)),
  },
});

// ui mock will be used
// test('', async ({ mock }) => {
//   const opts = new MockOptionsBuilder()
//     .withUrl('test/url')
//     .withMethod('get')
//     .withStatusCode(HTTP_STATUS_CODES.ALREADY_EXISTS)
//     .create();

//   await mock.modifyResponse(opts);
// });
