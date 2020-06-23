import Route from '@ember/routing/route'

export default class ReadLinksDataRoute extends Route {
  queryParams = {
    pageNumber: {
      as: 'p',
      refreshModel: true,
    },
    searchText: {
      as: 's',
      refreshModel: true,
    },
  }

  model({ pageNumber, searchText }) {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: {
        read: true,
        title: searchText,
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
}
