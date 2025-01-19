import { ILoginResponse, IUserCredentials } from 'types/user/user.types';
import {  UniqueElement } from './salesPortal.page';
import { apiConfig } from '../../api/config/apiConfig';

export class SignInPage extends UniqueElement {
  readonly 'Email input' = this.findElement('#emailinput');
  readonly 'Password input' = this.findElement('#passwordinput');
  readonly 'Login button' = this.findElement('button.btn-primary');
  readonly uniqueElement: string = '';

  async fillCredentialFields(credentials: IUserCredentials) {
    await this.fillValue(this['Email input'], credentials.username);
    await this.fillValue(this['Password input'], credentials.password, { isSecret: true });
  }

  async clickSignInButton() {
    await this.clickOn(this['Login button']);
  }

  async clickSignInAndGetTokenFromResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Login;
    const response = await this.interceptResponse<ILoginResponse>(url, this.clickSignInButton.bind(this));
    return response.data.token;
  }
}
