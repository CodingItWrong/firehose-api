import Controller from '@ember/controller';
import { sort } from '@ember-decorators/object/computed';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class IndexController extends Controller {
  @service session;

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc']);
  loggedOutLinkSorting = Object.freeze(['published_at:desc']);

  @sort('model', 'loggedInLinkSorting')
  loggedInSortedLinks;

  @sort('model', 'loggedOutLinkSorting')
  loggedOutSortedLinks;

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
