import { request } from '@playwright/test';
import { BaseApiClient } from 'api/request/request-base';
import ReporterService from 'utils/reporter/reporters/reporter';
import { omit } from '../../utils/utils';
import { apiConfig } from '../config/apiConfig';
import LoggerService from '../../utils/logger';

class RequestApiClient extends BaseApiClient {
  protected async send() {
    const requestContext = await request.newContext({
      baseURL: this.options?.baseURL ?? apiConfig?.baseURL,
    });
    return await requestContext.fetch(this.options!.url, omit(this.options!, ['baseURL', 'url']));
  }

  protected transformRequestOptions() {
    //
  }

  protected async transformResponse() {
    const contentType = this.response.headers()['content-type'] || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await this.response.json();
    } else {
      body = await this.response.text();
    }
    this.response = {
      status: this.response.status(),
      body,
      headers: this.response.headers(),
    };
  }

  protected logError(error: any) {
    console.log('Error', error.message);
    console.log('Request URL:', this.options?.method, this.options?.url);
  }
}

export default new RequestApiClient(ReporterService, LoggerService);
