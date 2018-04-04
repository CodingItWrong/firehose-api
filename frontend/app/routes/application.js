import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  actions: {
    willTransition() {
      $('.navbar-collapse').collapse('hide');
    },
  },
});
