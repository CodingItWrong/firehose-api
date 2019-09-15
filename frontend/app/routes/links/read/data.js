import Route from '@ember/routing/route'
import { action } from '@ember/object'

export default class ReadLinksDataRoute extends Route {
  queryParams = {
    page: {
      as: 'page',
      refreshModel: true,
    },
  }

  model({ page }) {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: { read: true },
      page,
    })
  }

  @action
  willTransition() {
    this.controller.reset()
    return true
  }
}
