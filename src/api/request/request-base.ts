import fieldsToHideInReport from 'data/report/fieldsToHideInReport';
import { IRequestOptions, IResponse } from 'types/api/apiClient.types';
import { hideValueInObject } from 'utils/object/index';
import { BaseReporter } from 'utils/reporter/reporters/baseReporter';
import { BaseLogger } from '../../utils/logger/baseLogger';

export abstract class BaseApiClient {
  protected response: IResponse | any;
  protected options: IRequestOptions | null;

  /**
   * Transforms requestOptions from IRequestOptions to satisfy the api client options type based on
   * the requestType field of requestOptions
   */
  protected abstract transformRequestOptions(): void;

  /**
   * Transforms response to IResponse
   */
  protected abstract transformResponse(error?: unknown): Promise<void>;

  /**
   * Sends request with provided options
   */
  protected abstract send(): Promise<object>;

  /**
   * Logs api errors to console
   * @param error error from your api client
   */
  protected abstract logError(error: unknown): void;

  // constructor(private reporterService: BaseReporter, private loggerService: Logger) {}
  constructor(private reporterService: BaseReporter, private loggerService: BaseLogger) {
    this.options = null;
  }

  /**
   * Sends request with provided request IRequestOptions and returns response as IResponse interface
   * @param initOptions Request options like url, method and etc from IRequestOptions interface
   * @returns
   */
  async sendRequest<T>(initOptions: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.options = initOptions;
      if (!this.options) throw new Error('Request options were not provided');
      this.transformRequestOptions();
      this.response = await this.send();
      await this.transformResponse();
      this.logSuccessResponse();
    } catch (error: unknown) {
      if (error) {
        this.logErrorResponse(error);
      }
      await this.transformResponse(error);
    } finally {
      this.secureCheck();
      await this.logRequest();
    }
    return this.response;
  }

  private logErrorResponse(error: unknown) {
    this.loggerService.log(`Error: ${(error as Error).message}`, 'error');
    this.loggerService.log(`Request URL: [${this.options?.method}] [${this.options?.url}]`, 'error');
  }

  private logSuccessResponse() {
    this.loggerService.log(`Response status: [${this.response.status}]`, 'info');
    this.loggerService.log(`Request URL: [${this.options?.method}] [${this.options?.url}]`, 'info');
  }

  private secureCheck() {
    fieldsToHideInReport.forEach((fieldToHide) =>
      this.options && hideValueInObject(this.options, fieldToHide));
  }

  private async logRequest() {
    await this.reporterService.reportApiRequest(this.options!, this.response);
  }
}
