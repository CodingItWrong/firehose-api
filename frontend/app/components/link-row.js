import Component from '@ember/component'
import { action, computed } from '@ember/object'
import { inject as service } from '@ember/service'
import { tagName } from '@ember-decorators/component'

@tagName('')
export default class LinkRow extends Component {
  @service session

  editing = false

  @computed('link.read')
  get showLink() {
    if (typeof this.showIfRead === 'undefined') {
      return true
    }
    return this.showIfRead === this.link.read
  }

  @action
  edit() {
    this.set('editing', true)
  }

  @action
  finishEditing() {
    this.set('editing', false)
  }
}
