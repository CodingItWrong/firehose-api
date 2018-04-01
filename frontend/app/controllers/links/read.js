import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  linkSorting: Object.freeze(['moved_to_list_at:desc']),
  sortedLinks: sort('model', 'linkSorting'),

  page: 1,
  perPage: 10,

  totalPages: computed('page', 'perPage', 'sortedLinks', function() {
    return Math.ceil(this.get('sortedLinks').get('length') / this.get('perPage'));
  }),

  isFirstPage: computed('page', function() {
    return this.get('page') === 1;
  }),

  isLastPage: computed('page', 'totalPages', function() {
    return this.get('page') === this.get('totalPages');
  }),

  pagedLinks: computed('sortedLinks', 'page', 'perPage', function() {
    let start = (this.get('page') - 1) * this.get('perPage');
    let end = this.get('page') * this.get('perPage');

    return this.get('sortedLinks').slice(start, end);
  }),

  scrollToTop() {
    window.scrollTo(0, 0);
  },

  actions: {
    nextPage() {
      this.incrementProperty('page');
      this.scrollToTop();
    },
    prevPage() {
      this.decrementProperty('page');
      this.scrollToTop();
    },
  },
});
