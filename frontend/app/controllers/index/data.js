import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { action } from '@ember/object'
import { sort } from '@ember/object/computed'

export default class IndexDataController extends Controller {
  @service session

  loggedInLinkSorting = Object.freeze(['moved_to_list_at:desc'])
  loggedOutLinkSorting = Object.freeze(['published_at:desc'])

  pageNumber = 1

  @sort('model', 'loggedInLinkSorting')
  loggedInSortedLinks

  @sort('model', 'loggedOutLinkSorting')
  loggedOutSortedLinks

  get totalPages() {
    return this.model.meta['page-count']
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  @action
  nextPage() {
    this.incrementProperty('pageNumber')
    this.scrollToTop()
  }

  @action
  prevPage() {
    this.decrementProperty('pageNumber')
    this.scrollToTop()
  }
}
