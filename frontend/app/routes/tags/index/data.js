import Route from '@ember/routing/route'

export default class TagIndexDataRoute extends Route {
  model() {
    return this.store.findAll('tag')
  }
}
