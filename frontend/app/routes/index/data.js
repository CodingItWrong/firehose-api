import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class IndexDataRoute extends Route {
  @service session

  queryParams = {
    pageNumber: {
      as: 'p',
      refreshModel: true,
    },
  }

  model({ pageNumber }) {
    let options = {
      include: 'tags',
      page: {
        number: pageNumber,
      },
    }

    if (this.session.get('isAuthenticated')) {
      options.filter = { read: false }
    }

    return this.store.query('bookmark', options)
  }
}
