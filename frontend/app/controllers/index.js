import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  session: service(),

  loggedInLinkSorting: Object.freeze(['moved_to_list_at:desc']),
  loggedOutLinkSorting: Object.freeze(['published_at:desc']),

  loggedInSortedLinks: sort('model', 'loggedInLinkSorting'),
  loggedOutSortedLinks: sort('model', 'loggedOutLinkSorting'),
});
