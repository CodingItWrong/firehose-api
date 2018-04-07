import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { action, computed } from 'ember-decorators/object';

export default class ReadLinksController extends Controller {
  linkSorting = Object.freeze(['moved_to_list_at:desc']);
  sortedLinks = sort('model', 'linkSorting');

  searchText = '';

  page = 1;
  perPage = 10;

  @computed('page', 'perPage', 'sortedLinks')
  get totalPages() {
    return Math.ceil(this.get('sortedLinks').get('length') / this.get('perPage'));
  }

  @computed('page')
  get isFirstPage() {
    return this.get('page') === 1;
  }

  @computed('page', 'totalPages')
  get isLastPage() {
    return this.get('page') === this.get('totalPages');
  }

  @computed('sortedLinks', 'searchText')
  get filteredLinks() {
    let searchText = this.get('searchText');
    return this.get('sortedLinks').filter(link => link.get('title').includes(searchText));
  }

  @computed('filteredLinks', 'page', 'perPage')
  get pagedLinks() {
    let start = (this.get('page') - 1) * this.get('perPage');
    let end = this.get('page') * this.get('perPage');

    return this.get('filteredLinks').slice(start, end);
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
