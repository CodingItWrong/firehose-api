import Route from '@ember/routing/route';

export default class ShowTagDataRoute extends Route {
  model() {
    let { tag_id } = this.paramsFor('tags/show');
    return this.store.findRecord('tag', tag_id, { include: 'bookmarks' });
  }
}
