import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class IndexController extends Controller {
  @service session;

  @action
  async handleAdd(event) {
    event.preventDefault();
    let link = this.store.createRecord('bookmark', { url: this.url });
    this.resetForm();
    await link.save();
  }

  resetForm() {
    this.set('url', '');
  }
}
