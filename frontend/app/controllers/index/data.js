import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { sort } from '@ember/object/computed'

export default class IndexDataController extends Controller {
  @service session

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc'])
  loggedOutLinkSorting = Object.freeze(['published_at:desc'])

  @sort('model', 'loggedInLinkSorting')
  loggedInSortedLinks

  @sort('model', 'loggedOutLinkSorting')
  loggedOutSortedLinks
}
