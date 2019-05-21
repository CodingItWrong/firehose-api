import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class IndexDataRoute extends Route {
  @service session

  model() {
    let options = { include: 'tags' }

    if (this.session.get('isAuthenticated')) {
      options.filter = { read: false }
    }

    return this.store.findAll('bookmark', options)
  }
}
