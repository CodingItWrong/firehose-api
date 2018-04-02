import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('link', {
      include: 'tags',
      filter: { read: true },
    });
  },
});
