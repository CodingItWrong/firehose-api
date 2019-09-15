import Route from '@ember/routing/route'
import { action } from '@ember/object'

export default class ReadLinksDataRoute extends Route {
  queryParams = {
    page: {
      as: 'page',
      refreshModel: true,
    },
    searchTerm: {
      as: 's',
      refreshModel: true,
    },
  }

  model({ page, searchTerm }) {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: { read: true },
      page,
      searchTerm,
    })
  }

  setupController(controller) {
    super.setupController(...arguments)
    controller.set('searchText', controller.searchTerm)
  }

  @action
  willTransition() {
    this.controller.reset()
    return true
  }
}
