import Route from '@ember/routing/route'
import { action } from '@ember-decorators/object'

export default class LoginRoute extends Route {
  @action
  didTransition() {
    this.controller.resetLoginForm()
  }
}
