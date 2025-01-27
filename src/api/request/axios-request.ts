import { IResponse } from '../../types/api/apiClient.types';
import { BaseApiClient } from './request-base';
import axios, { isAxiosError, AxiosRequestConfig } from 'axios';
import ReporterService from 'utils/reporter/reporters/reporter';
import LoggerService from '../../utils/logger';

class AxiosRequest extends BaseApiClient {
  protected async send(): Promise<IResponse> {
    const request = axios.create();
    return request(this.options as AxiosRequestConfig);
  }

  protected async transformRequestOptions()  {
    //
  }

  protected async transformResponse(error?: unknown) {
    if (isAxiosError(error)) {
      this.response = {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      };
    }
    this.response = {
      data: this.response?.data,
      status: this.response?.status,
      headers: this.response?.headers,
    };
  }

  protected logError(error: unknown) {
    console.log('Error', (error as Error).message);
    console.log('Request URL:', this.options?.method, this.options?.url);
  }
}

export default new AxiosRequest(ReporterService, LoggerService);