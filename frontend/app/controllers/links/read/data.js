import Controller from '@ember/controller';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { observes } from '@ember-decorators/object';

export default class ReadLinksController extends Controller {
  pageNumber = 1;
  searchText = '';

  get totalPages() {
    return this.model.meta['page-count'];
  }

  reset() {
    this.set('pageNumber', 1);

    // causes edited search text to flicker
    // this.set('searchText', '')
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  setSearchTextFromQP() {
    this.set('editedSearchText', this.searchText);
  }

  @action
  performSearch(e) {
    e.preventDefault();
    this.set('searchText', this.editedSearchText);
    this.set('pageNumber', 1);
  }

  @action
  nextPage() {
    this.incrementProperty('pageNumber');
    this.scrollToTop();
  }

  @action
  prevPage() {
    this.decrementProperty('pageNumber');
    this.scrollToTop();
  }
}
