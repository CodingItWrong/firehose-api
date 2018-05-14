import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class IndexController extends Controller {
  @service session;

  @action
  async handleAdd(event) {
    event.preventDefault();
    await this.store.addRecord({ type: 'bookmark', url: this.url });
    this.resetForm();
  }

  resetForm() {
    this.set('url', '');
  }
}
