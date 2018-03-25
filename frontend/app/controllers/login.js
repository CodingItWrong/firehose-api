import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  resetLoginForm() {
    this.setProperties({
      email: '',
      password: '',
    });
  },

  actions: {
    async authenticate() {
      let { email, password } = this.getProperties('email', 'password');

      try {
        await this.get('session').authenticate('authenticator:oauth', email, password);
      } catch (e) {
        this.set('errorMessage', e.error || e);
      }
      await this.transitionToRoute('index');
    },
  },
});
