import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;

  @tracked errorMessage;

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
      this.errorMessage =
        e?.responseJSON?.error_description ??
        e?.message ??
        'An error occurred while logging in.';
    }
  }
}
