import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.liveQuery(q => (
      q.findRecords('bookmark')
        .filter({ attribute: 'read', value: true })
      // include: 'tags',
    ));
  },
});
