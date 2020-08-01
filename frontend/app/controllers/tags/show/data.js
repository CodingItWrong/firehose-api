import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default class ShowTagsController extends Controller {
  linkSorting = Object.freeze(['moved_to_list_at:desc']);

  @sort('model.bookmarks', 'linkSorting')
  sortedLinks;
}
