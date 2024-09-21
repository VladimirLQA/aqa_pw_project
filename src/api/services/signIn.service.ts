import { clients } from '../clients/index';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { UsersStorage } from '../../utils/storages';
// TODO refactor with oop
class SignInApiService {
  private token: string | null = null;

  constructor(private client = clients.signIn) {}

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const resp = await this.client.login(
      { data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } },
    );
    UsersStorage.setUser(ADMIN_USERNAME, { token: resp.data.token });
    this.setToken(resp.data.token);
    return this.getToken();
  }

  removeToken() {
    this.token = null;
  }

  getToken() {
    return this.getConvertedToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  private getConvertedToken() {
    return `Bearer ${this.token}`;
  }
}

export default new SignInApiService();
