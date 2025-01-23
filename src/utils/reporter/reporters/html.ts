import { test } from '../../../fixtures/base.fixture';
import { BaseReporter } from './baseReporter';

class HTMLReporter extends BaseReporter {
  private testInfo = test.info;

  protected async reportApiRequestData() {
    await test.step('',
      async () => {
        await this.testInfo().attach(`Request Headers: [${this.requestOptions?.options.method?.toUpperCase()}] [${this.requestOptions?.url}]`, {
          body: JSON.stringify(this.requestOptions?.options.headers, null, 2) ?? '',
          contentType: 'application/json'
        });
        await this.testInfo().attach(`Request Body [${this.requestOptions?.options.method?.toUpperCase()}] [${this.requestOptions?.url}]`, {
          body: JSON.stringify(this.requestOptions?.options.data, null, 2) ?? '',
          contentType: 'application/json'
        });
      }
    );
  }

  protected async reportApiResponseData() {
    await test.step('',
      async () => {
        await this.testInfo().attach(`Response Headers [${this.requestOptions?.options.method?.toUpperCase()}] [${this.response?.status}] [${this.requestOptions?.url}]`, {
          body: JSON.stringify(this.response?.headers, null, 2) ?? '',
          contentType: 'application/json'
        });
        await this.testInfo().attach(`Response Body [${this.requestOptions?.options.method?.toUpperCase()}] [${this.response?.status}]  [${this.requestOptions?.url}]`, {
          body: JSON.stringify(this.response?.data, null, 2) ?? '',
          contentType: 'application/json'
        });
      }
    );
  }

  attachLog(log: string) {
    this.testInfo().attach('Test logs', {
      body: log,
      contentType: 'text/plain'
    });
  }

  clearReportResults() {
    // rimraf.sync('src/report/allure-results');
  }
}

export default new HTMLReporter();
