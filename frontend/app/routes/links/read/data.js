import Route from '@ember/routing/route'
import { action } from '@ember/object'

export default class ReadLinksDataRoute extends Route {
  queryParams = {
    page: {
      as: 'page',
      refreshModel: true,
    },
    searchTextQP: {
      as: 's',
      refreshModel: true,
    },
  }

  model({ page, searchTextQP }) {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: {
        read: true,
        title: searchTextQP,
      },
      page: {
        number: page,
      },
    })
  }

  setupController(controller) {
    super.setupController(...arguments)
    controller.setSearchTextFromQP()
  }

  @action
  willTransition() {
    this.controller.reset()
    return true
  }
}
