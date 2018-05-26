import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { tag_id } = this.paramsFor('tags/show');
    return this.store.query(
      q => q.findRecord({ type: 'tag', id: tag_id }),
      { sources: { remote: { include: ['bookmarks'] } } },
    );
  },
});
