import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async signOut() {
      this.get('session').invalidate();

      await this.get('store').unloadAll('link');
      await this.store.findAll('link');
    },
  },
});
