import Route from '@ember/routing/route'
import { action } from '@ember/object'

export default class ReadLinksDataRoute extends Route {
  queryParams = {
    pageNumber: {
      as: 'p',
      refreshModel: true,
    },
    searchTextQP: {
      as: 's',
      refreshModel: true,
    },
  }

  model({ pageNumber, searchTextQP }) {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: {
        read: true,
        title: searchTextQP,
      },
      page: {
        number: pageNumber,
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
