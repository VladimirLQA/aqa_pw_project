import { HTTP_STATUS_CODES } from '../../data/http/statusCodes';
import { PageHolder } from '../../ui/pages/pageHolder.page';
import { test as base } from './services.fixture';

export class UIMock extends PageHolder {
  public async modifyResponse<T>(
    opt: {
      url: string,
      body: T,
      statusCode: typeof HTTP_STATUS_CODES[keyof typeof HTTP_STATUS_CODES],
    },
  ) {
    const { url, body, statusCode } = opt;

    await this.page.route(url, async (route, request) => {
      // if (request.method() === 'POST') {
      //   // logic
      // }
      await route.fulfill({
        json: body,
        status: statusCode,
      });
    });
  }
}
interface MockFixture {
  mock: UIMock;
}

export const test = base.extend<MockFixture>({
  mock: async ({ page }, use) => {
    await use(new UIMock(page));
  },
});
