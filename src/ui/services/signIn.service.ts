import { HomePage } from '../pages/homePage.page';
import { SignInPage } from '../pages/signInPage.page';
import { PageHolder } from '../pages/pageHolder.page';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { IUserCredentials } from '../../types/user/user.types';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { Users } from '../../utils/storages';

export class SignInService extends PageHolder {
  private signInPage = new SignInPage(this.page);

  private homePage = new HomePage(this.page);

  @logStep('Open sales portal')
  async openSalesPortal() {
    await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }

  @logStep('Sign In')
  async signIn(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialFields(credentials);
    const token = await this.signInPage.clickSignInAndGetTokenFromResponse();
    Users.setUser(credentials.username, { token });
    await this.homePage.waitForPageIsLoaded();
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
}
