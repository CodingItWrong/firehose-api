import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default class LinkFormComponent extends Component {
  @service store;

  didInsertElement() {
    console.log('didInsertElement');
    console.log(this.link);
  }

  @computed('link')
  get buffer() {
    return BufferedProxy.create({
      content: this.link,
    });
  }

  @action
  async handleSave(event) {
    event.preventDefault();
    this.buffer.applyBufferedChanges();
    // await this.link.get('tags').reload();
    this.onSave();
  }

  @action
  handleCancel() {
    this.onCancel();
  }
}
