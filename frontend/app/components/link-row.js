import Component from '@ember/component'
import { action } from '@ember/object'
import { tagName } from '@ember-decorators/component'
import { inject as service } from '@ember-decorators/service'
import { computed } from '@ember-decorators/object'

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
