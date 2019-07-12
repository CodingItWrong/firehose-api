import Component from '@ember/component'
import { computed } from '@ember/object'

export default class PaginationControls extends Component {
  @computed('page', 'perPage', 'records')
  get totalPages() {
    return Math.ceil(this.records.length / this.perPage)
  }

  @computed('totalPages')
  get anyPages() {
    return this.totalPages > 0
  }

  @computed('page')
  get isFirstPage() {
    return this.page === 1
  }

  @computed('page', 'totalPages')
  get isLastPage() {
    return this.page >= this.totalPages
  }
}
