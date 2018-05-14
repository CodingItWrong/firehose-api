import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Route.extend({
  dataCoordinator: service(),
  session: service(),

  beforeModel() {
    const coordinator = this.dataCoordinator;

    let { access_token } = this.session.data.authenticated;
    coordinator.getSource('remote').defaultFetchHeaders.Authorization = `Bearer ${access_token}`;

    return coordinator.activate();
  },

  scrollToTop() {
    window.scrollTo(0, 0);
  },

  actions: {
    willTransition() {
      $('.navbar-collapse').collapse('hide');
      this.scrollToTop();
    },
  },
});
