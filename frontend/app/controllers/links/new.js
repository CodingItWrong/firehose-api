import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';

export default class NewLinkController extends Controller {
  resetForm() {
    this.set('url', '');
  }

  @action
  async handleSave(event) {
    event.preventDefault();
    let link = this.store.createRecord('bookmark', { url: this.get('url') });
    await link.save();
    this.transitionToRoute('index');
  }
}
