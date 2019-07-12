import Controller from '@ember/controller'
import { action, computed } from '@ember/object'
import { sort } from '@ember/object/computed'

export default class ReadLinksController extends Controller {
  linkSorting = Object.freeze(['moved_to_list_at:desc'])

  @sort('model', 'linkSorting')
  sortedLinks

  searchText = ''

  page = 1
  perPage = 10

  @computed('sortedLinks', 'searchText')
  get filteredLinks() {
    let searchText = this.searchText.toLowerCase()
    return this.sortedLinks.filter(link =>
      link.title.toLowerCase().includes(searchText),
    )
  }

  @computed('page', 'perPage', 'filteredLinks')
  get totalPages() {
    return Math.ceil(this.filteredLinks.length / this.perPage)
  }

  @computed('page')
  get isFirstPage() {
    return this.page === 1
  }

  @computed('page', 'totalPages')
  get isLastPage() {
    return this.page >= this.totalPages
  }

  @computed('filteredLinks', 'page', 'perPage')
  get pagedLinks() {
    let { page, perPage } = this
    let start = (page - 1) * perPage
    let end = page * perPage

    return this.filteredLinks.slice(start, end)
  }

  reset() {
    this.set('page', 1)
    this.set('searchText', '')
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  @action
  nextPage() {
    this.incrementProperty('page')
    this.scrollToTop()
  }

  @action
  prevPage() {
    this.decrementProperty('page')
    this.scrollToTop()
  }
}
