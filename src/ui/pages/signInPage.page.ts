import { IUserCredentials } from 'types/user/user.types';
import { SalesPortalPage } from './salesPortal.page';

export class SignInPage extends SalesPortalPage {
  readonly 'Email input' = this.findElement('#emailinput');

  readonly 'Password input' = this.findElement('#passwordinput');

  readonly 'Login button' = this.findElement('button.btn-primary');

  async fillCredentialFields(credentials: IUserCredentials) {
    await this.fillValue(this['Email input'], credentials.username);
    await this.fillValue(this['Password input'], credentials.password, { isSecret: true });
  }

  async clickSignInButton() {
    await this.clickOn(this['Login button']);
  }

  // async clickSignInAndGetTokenFromResponse() {
  //   const url = apiConfig.baseURL + apiConfig.endpoints.Login;
  //   const response = await this.interceptResponse<ILoginResponse>(url, this.clickSignInButton.bind(this));
  //   return response.data.token;
  // }
}
