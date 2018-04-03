import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  linkSorting: Object.freeze(['moved_to_list_at:desc']),
  sortedLinks: sort('model.links', 'linkSorting'),
});
