import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class IndexDataRoute extends Route {
  @service session

  model() {
    let options = { include: 'tags' }

    if (this.session.get('isAuthenticated')) {
      return this.store.query('bookmark', {
        ...options,
        filter: { read: false },
      })
    } else {
      return this.store.findAll('bookmark', options)
    }
  }
}
