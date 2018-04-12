import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class IndexController extends Controller {
  @service session;

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc']);
  loggedOutLinkSorting = Object.freeze(['published_at:desc']);

  loggedInSortedLinks = sort('model', 'loggedInLinkSorting');
  loggedOutSortedLinks = sort('model', 'loggedOutLinkSorting');

  @action
  async handleAdd(event) {
    event.preventDefault();
    let link = this.store.createRecord('bookmark', { url: this.get('url') });
    this.resetForm();
    await link.save();
  }

  resetForm() {
    this.set('url', '');
  }
}
