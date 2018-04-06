import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    async signOut() {
      this.get('session').invalidate();

      await this.store.unloadAll('bookmark');
      await this.store.findAll('bookmark');

      this.transitionToRoute('index');
    },
  },
});
