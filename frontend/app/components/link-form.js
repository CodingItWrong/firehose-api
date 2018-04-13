import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default class LinkFormComponent extends Component {
  @computed('link')
  get buffer() {
    return BufferedProxy.create({
      content: this.link,
    });
  }

  @action
  handleSave(event) {
    event.preventDefault();
    this.buffer.applyBufferedChanges();
    this.link.save();
    this.onSave();
  }

  @action
  handleCancel() {
    this.onCancel();
  }
}
