import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  session: service(),

  linkSorting: Object.freeze(['moved_to_list_at:desc']),
  sortedLinks: sort('model', 'linkSorting'),
});
