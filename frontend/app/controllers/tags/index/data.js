import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class TagsIndexController extends Controller {
  tagSorting = Object.freeze(['name']);

  @sort('model', 'tagSorting')
  sortedTags;
}
