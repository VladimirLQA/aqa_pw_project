import { ADMIN_USERNAME, ADMIN_PASSWORD } from 'config/environment';
import { ILoginResponse, IUserCredentials } from 'types/user/user.types';
import { Users } from 'utils/storages';
import { apiConfig } from 'api/config/apiConfig';
import { logStep } from 'utils/reporter/decorators/logStep';
import { SalesPortalPage } from './salesPortal.page';

export class SignInPage extends SalesPortalPage {
  readonly 'Email input' = this.findElement('#emailinput');

  readonly 'Password input' = this.findElement('#passwordinput');

  readonly 'Login button' = this.findElement('button.btn-primary');

  @logStep('Sign In')
  async signIn(credentials?: IUserCredentials) {
    await this.fillValue(this['Email input'], credentials?.username ?? ADMIN_USERNAME);
    await this.fillValue(this['Password input'], credentials?.password ?? ADMIN_PASSWORD, { isSecret: true });
    const token = await this.clickSignInAndGetTokenFromResponse();
    await this.waitForPageIsLoaded();
    Users.setUser(ADMIN_USERNAME, { token });
  }

  @logStep('Sign In as Admin')
  async signInAsAdmin() {
    await this.signIn({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  @logStep('Click on Sign In button')
  async clickSignInButton() {
    await this.clickOn(this['Login button']);
  }

  private async clickSignInAndGetTokenFromResponse() {
    const url = apiConfig.baseURL + apiConfig.endpoints.Login;
    const response = await this.interceptResponse<ILoginResponse>(url, this.clickSignInButton.bind(this));
    return response.data.token;
  }
}
