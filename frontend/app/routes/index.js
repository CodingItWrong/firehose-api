import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  model() {
    if (this.get('session').get('isAuthenticated')) {
      return this.store.query('link', {
        filter: { read: false },
      });
    } else {
      return this.store.findAll('link');
    }
  },
});
