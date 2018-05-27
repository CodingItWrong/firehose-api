import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('bookmark', {
      include: 'tags',
      filter: { read: true },
    });
  },

  actions: {
    willTransition() {
      this.controller.reset();
      return true;
    },
  },
});
