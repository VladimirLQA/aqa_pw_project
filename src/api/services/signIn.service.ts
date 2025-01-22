import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment';
import { logStep } from '../../utils/reporter/decorators/logStep';
import { UsersStorage } from '../../utils/storages';
import { controllers } from '../controllers';

class SignInApiService {
  constructor(private client = controllers?.signIn, private userStorage = UsersStorage) {}

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const resp = await this.client.login(
      { data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } });
    this.userStorage.setUser(ADMIN_USERNAME, { token: resp.headers?.authorization as string });
    return this.userStorage.getToken(ADMIN_USERNAME);
  }

  removeToken(userName?: string) {
    this.userStorage.removeToken(userName);
  }

  async getToken(userName?: string) {
    if (!this.userStorage.getToken(userName)) {
      await this.signInAsAdminApi();
    }
    return this.userStorage.getToken(userName);
  }

  setToken(token: string, username?: string) {
    this.userStorage.setToken({ token }, username);
  }
}

export default new SignInApiService();
