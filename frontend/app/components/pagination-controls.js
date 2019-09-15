import Component from '@ember/component'
import { computed } from '@ember/object'

export default class PaginationControls extends Component {
  @computed('totalPages')
  get anyPages() {
    return this.totalPages > 0
  }

  @computed('pageNumber')
  get isFirstPage() {
    return this.pageNumber === 1
  }

  @computed('pageNumber', 'totalPages')
  get isLastPage() {
    return this.pageNumber >= this.totalPages
  }
}
