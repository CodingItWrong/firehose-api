import Controller from '@ember/controller';
import { action, computed } from 'ember-decorators/object';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default class EditLinksController extends Controller {
  @computed('model')
  get buffer() {
    return BufferedProxy.create({
      content: this.get('model'),
    });
  }

  @action
  async handleSave(event) {
    event.preventDefault();

    this.get('buffer').applyBufferedChanges();
    let link = this.get('model');
    await link.save();

    this.transitionToRoute('index');
  }
}
