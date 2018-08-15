import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';
import $ from 'jquery';

export default class ApplicationRoute extends Route {
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @action
  willTransition() {
    $('.navbar-collapse').collapse('hide');
    this.scrollToTop();
  }
}
