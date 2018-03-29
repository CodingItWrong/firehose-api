import Route from '@ember/routing/route';

export default Route.extend({
  model({ link_id }) {
    // TODO figure out how to pass it automatically and skip the model hook
    return this.get('store').findRecord('link', link_id);
  },
});
