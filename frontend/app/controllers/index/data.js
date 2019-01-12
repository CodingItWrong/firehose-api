import Controller from '@ember/controller'
import { sort } from '@ember-decorators/object/computed'
import { service } from '@ember-decorators/service'

export default class IndexDataController extends Controller {
  @service session

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc'])
  loggedOutLinkSorting = Object.freeze(['published_at:desc'])

  @sort('model', 'loggedInLinkSorting')
  loggedInSortedLinks

  @sort('model', 'loggedOutLinkSorting')
  loggedOutSortedLinks
}
