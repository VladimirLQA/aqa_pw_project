import { request } from '@playwright/test';
import { BaseApiClient } from 'api/request/request-base';
import ReporterService from 'utils/reporter/reporters/reporter';

class RequestApiClient extends BaseApiClient {
  protected async send() {
    const apiContext = await request.newContext();
    const resp = await apiContext.fetch(
      this.options!.url, this.options!.options,
    );
    return resp;
  }

  protected transformRequestOptions() {
    if (this.options?.requestType === 'formData') {
      // TBD
    }
  }

  protected async transformResponse() {
    const transformedResponse = {
      data: this.options!.options.method === 'DELETE' ? null : await this.response.json(),
      status: this.response.status(),
      headers: this.response.headers(),
    };
    this.response = transformedResponse;
  }

  protected logError(error: any) {
    console.log('Error', error.message);
    console.log('Request URL:', this.options!.options.method, this.options?.url);
  }
}

export default new RequestApiClient(ReporterService);
