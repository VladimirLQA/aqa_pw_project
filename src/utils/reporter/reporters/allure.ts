import { BaseReporter } from 'utils/reporter/reporters/baseReporter';
import { allure } from 'allure-playwright';
import * as rimraf from 'rimraf';

class AllureReporter extends BaseReporter {
  protected async reportApiRequestData() {
    await allure.step(
      `Request: ${this.requestOptions?.method?.toUpperCase()} ${this.requestOptions?.url}`,
      async () => {
        await allure.attachment(
          'Request Headers',
          JSON.stringify(this.requestOptions?.headers, null, 2),
          'application/json',
        );
        await allure.attachment(
          'Request Body',
          this.requestOptions?.data
            ? JSON.stringify(this.requestOptions?.data, null, 2)
            : '{}',
          'application/json',
        );
      },
    );
  }

  protected async reportApiResponseData() {
    await allure.step(
      `Response: ${this.response?.status} status, ${this.requestOptions?.url}`,
      async () => {
        await allure.attachment(
          'Response Headers',
          JSON.stringify(this.response?.headers, null, 2),
          'application/json',
        );
        await allure.attachment(
          'Response Body',
          JSON.stringify(this.response?.data, null, 2),
          'application/json',
        );
      },
    );
  }

  attachLog(log: string) {
    allure.attachment('Test logs', log, 'text/plain');
  }

  clearReportResults() {
    rimraf.sync('src/report/allure-results');
  }
}

export default new AllureReporter();
