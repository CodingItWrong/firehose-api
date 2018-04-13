import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { action, computed } from '@ember-decorators/object';

export default class ReadLinksController extends Controller {
  linkSorting = Object.freeze(['moved_to_list_at:desc']);
  sortedLinks = sort('model', 'linkSorting');

  searchText = '';

  page = 1;
  perPage = 10;

  @computed('sortedLinks', 'searchText')
  get filteredLinks() {
    let searchText = this.searchText.toLowerCase();
    return this
      .get('sortedLinks') // this.sortedLinks returns undefined. why? is it because of the sort computed helper? Should I be using the ember-decorators one?
      .filter(link => link.title
        .toLowerCase()
        .includes(searchText));
  }

  @computed('page', 'perPage', 'filteredLinks')
  get totalPages() {
    return Math.ceil(this.filteredLinks.length / this.perPage);
  }

  @computed('page')
  get isFirstPage() {
    return this.page === 1;
  }

  @computed('page', 'totalPages')
  get isLastPage() {
    return this.page === this.totalPages;
  }

  @computed('filteredLinks', 'page', 'perPage')
  get pagedLinks() {
    let { page, perPage } = this;
    let start = (page - 1) * perPage;
    let end = page * perPage;

    return this.filteredLinks.slice(start, end);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @action
  nextPage() {
    this.incrementProperty('page');
    this.scrollToTop();
  }

  @action
  prevPage() {
    this.decrementProperty('page');
    this.scrollToTop();
  }
}
