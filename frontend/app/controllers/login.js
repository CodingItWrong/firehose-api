import Controller from '@ember/controller'
import { action } from '@ember-decorators/object'
import { service } from '@ember-decorators/service'

export default class LoginController extends Controller {
  @service session

  resetLoginForm() {
    this.setProperties({
      email: '',
      password: '',
    })
  }

  @action
  async authenticate() {
    let { email, password } = this

    try {
      await this.session.authenticate('authenticator:oauth', email, password)
      await this.transitionToRoute('index')
    } catch (e) {
      this.set('errorMessage', e.error || e)
    }
  }
}
