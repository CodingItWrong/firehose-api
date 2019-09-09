import Component from '@ember/component'
import { action, computed } from '@ember/object'
import { inject as service } from '@ember/service'
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
    if (this.link.id) {
      // do not run in tests
      await this.store.findRecord('bookmark', this.link.id, { include: 'tags' })
    }
    this.onSave()
  }

  @action
  handleCancel() {
    this.onCancel()
  }
}
