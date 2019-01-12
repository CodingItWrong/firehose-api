import Route from '@ember/routing/route'
import { action } from '@ember-decorators/object'

export default class ReadLinksDataRoute extends Route {
  model() {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: { read: true },
    })
  }

  @action
  willTransition() {
    this.controller.reset()
    return true
  }
}
