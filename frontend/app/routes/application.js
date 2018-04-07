import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
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
