import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class TagsIndexController extends Controller {
  tagSorting = Object.freeze(['name']);
  sortedTags = sort('model', 'tagSorting');
}
