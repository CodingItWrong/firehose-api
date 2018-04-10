import Component from '@ember/component';
import { action, computed } from 'ember-decorators/object';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default class LinkFormComponent extends Component {
  @computed('link')
  get buffer() {
    return BufferedProxy.create({
      content: this.get('link'),
    });
  }

  @action
  handleSave(event) {
    event.preventDefault();
    this.get('onSave')();
  }

  @action
  handleCancel() {
    this.get('onCancel')();
  }
}
