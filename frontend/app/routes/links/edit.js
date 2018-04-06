import Route from '@ember/routing/route';

export default Route.extend({
  model({ link_id }) {
    return this.store.findRecord('bookmark', link_id);
  },
});
