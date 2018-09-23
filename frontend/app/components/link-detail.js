import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class LinkDetail extends Component {
  @service session;

  @action
  async markRead() {
    this.link.set('read', true);
    await this.link.save();
  }

  @action
  async markUnread() {
    this.link.set('read', false);
    await this.link.save();
  }

  @action
  edit() {
    this.onEdit();
  }

  @action
  async delete() {
    await this.link.destroyRecord();
  }
}
