import Route from '@ember/routing/route';
import { action } from '@ember/object';
import $ from 'jquery';

export default class ApplicationRoute extends Route {
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @action
  willTransition() {
    // TODO see if hiding by route change happens automatically
    // $('.navbar-collapse').collapse('hide');
    this.scrollToTop();
  }
}
