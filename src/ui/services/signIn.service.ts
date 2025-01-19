import { HomePage } from '../pages/homePage.page';
import { SignInPage } from '../pages/signInPage.page';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { ILoginResponse, IUserCredentials } from '../../types/user/user.types';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { UsersStorage } from '../../utils/storages';
import { SalesPortalService } from './salesPortal.service';
import { apiConfig } from '../../api/config/apiConfig';

export class SignInService extends SalesPortalService {
  private signInPage = new SignInPage(this.page);
  private homePage = new HomePage(this.page);

  @logStep('Open sales portal')
  async openSalesPortal() {
    await this.signInPage.openPage();
  }

  @logStep('Sign In')
  async signIn(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialFields(credentials);
    const token = await this.clickSignInAndGetTokenFromResponse();
    UsersStorage.setUser(credentials.username, { token });
    await this.homePage.waitForOpened();
  }

  @logStep('Login as Admin')
  async loginAsAdmin() {
    await this.signIn({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  @logStep('Sign Out')
  async signOut() {
    await this.signInPage.deleteCookies('Authorization');
  }

  private async clickSignInAndGetTokenFromResponse() {
    const url = `${apiConfig.baseURL}/${apiConfig.endpoints.Login}`;
    const response = await this.basePage.interceptResponse<ILoginResponse>(
      url, this.clickSignInButton.bind(this),
    );
    return response.headers['authorization'] as string;
  }

  private async clickSignInButton() {
    await this.signInPage.clickSignInButton();
  }
}
