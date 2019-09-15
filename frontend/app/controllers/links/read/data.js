import Controller from '@ember/controller'
import { action, computed } from '@ember/object'
import { sort } from '@ember/object/computed'
import { observes } from '@ember-decorators/object'

export default class ReadLinksController extends Controller {
  pageNumber = 1
  searchTextQP = ''

  @computed('model')
  get totalPages() {
    return this.model.meta['page-count']
  }

  reset() {
    this.set('pageNumber', 1)
    this.set('searchText', '')
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  setSearchTextFromQP() {
    this.set('searchText', this.searchTextQP)
  }

  @action
  performSearch(e) {
    e.preventDefault()
    this.set('searchTextQP', this.searchText)
    this.set('pageNumber', 1)
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
