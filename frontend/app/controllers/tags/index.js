import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  tagSorting: Object.freeze(['name']),
  sortedTags: sort('model', 'tagSorting'),
});
