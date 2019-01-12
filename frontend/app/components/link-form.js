import Component from '@ember/component'
import { action, computed } from '@ember-decorators/object'
import { service } from '@ember-decorators/service'
import BufferedProxy from 'ember-buffered-proxy/proxy'

export default class LinkFormComponent extends Component {
  @service store

  @computed('link')
  get buffer() {
    return BufferedProxy.create({
      content: this.link,
    })
  }

  @action
  async handleSave() {
    this.buffer.applyBufferedChanges()
    await this.link.save()
    await this.link.get('tags').reload()
    this.onSave()
  }

  @action
  handleCancel() {
    this.onCancel()
  }
}
