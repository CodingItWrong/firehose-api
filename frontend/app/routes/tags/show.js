import Route from '@ember/routing/route';

export default Route.extend({
  model({ tag_id }) {
    return this.store.findRecord('tag', tag_id, { include: 'my-links' });
  },
});
