import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { service } from 'ember-decorators/service';

export default class IndexController extends Controller {
  @service session;

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc']);
  loggedOutLinkSorting = Object.freeze(['published_at:desc']);

  loggedInSortedLinks = sort('model', 'loggedInLinkSorting');
  loggedOutSortedLinks = sort('model', 'loggedOutLinkSorting');
}
