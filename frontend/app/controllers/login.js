import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;

  resetLoginForm() {
    this.setProperties({
      email: '',
      password: '',
    });
  }

  @action
  async authenticate() {
    let { email, password } = this;

    try {
      await this.session.authenticate('authenticator:oauth', email, password);
      await this.transitionToRoute('index');
    } catch (e) {
      const errorMessage =
        e?.responseJSON?.error_description ??
        e?.message ??
        'An error occurred while logging in.';

      this.set('errorMessage', errorMessage);
    }
  }
}
