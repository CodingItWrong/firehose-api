import Component from '@ember/component'
import { action } from '@ember-decorators/object'
import { service } from '@ember-decorators/service'

export default class LinkDetail extends Component {
  @service session

  @action
  async markRead(event) {
    if (event) {
      event.preventDefault()
    }
    this.link.set('read', true)
    await this.link.save()
  }

  @action
  async markUnread(event) {
    if (event) {
      event.preventDefault()
    }
    this.link.set('read', false)
    await this.link.save()
  }

  @action
  edit(event) {
    if (event) {
      event.preventDefault()
    }
    this.onEdit()
  }

  @action
  async delete(event) {
    if (event) {
      event.preventDefault()
    }
    await this.link.destroyRecord()
  }
}
