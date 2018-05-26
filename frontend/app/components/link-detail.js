import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  store: service(),

  tagName: '',

  actions: {
    async markRead(event) {
      event.preventDefault();
      this.link.set('read', true);
    },

    async markUnread(event) {
      event.preventDefault();
      this.link.set('read', false);
    },

    edit(event) {
      event.preventDefault();
      this.onEdit();
    },

    async delete(event) {
      event.preventDefault();
      await this.store.update(t => t.removeRecord({ type: 'bookmark', id: this.link.id }));
    },
  },
});
