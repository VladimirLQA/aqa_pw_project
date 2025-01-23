import { IRequestOptions, RequestParams } from 'types/api/apiClient.types';
import { IUserCredentials } from 'types/user/user.types';
import { apiConfig } from 'api/config/apiConfig';
import apiClient from 'api/request/request-index';
import { logStep } from 'utils/reporter/decorators/logStep';

class SignInController {
  constructor(private client = apiClient) {}

  @logStep('Sign in via API')
  async login(params: Omit<RequestParams<IUserCredentials>, 'token'>) {
    const options: IRequestOptions = {
      url: apiConfig.baseURL + apiConfig.endpoints.Login,
      options: {
        method: 'POST',
        headers: {},
        data: params.data,
      },
      requestType: 'json',
    };
    return this.client.sendRequest(options);
  }
}
export default new SignInController();
