import Component from '@glimmer/component'

export default class PaginationControls extends Component {
  get anyPages() {
    return this.args.totalPages > 0
  }

  get isFirstPage() {
    return this.args.pageNumber === 1
  }

  get isLastPage() {
    return this.args.pageNumber >= this.args.totalPages
  }
}
