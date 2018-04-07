import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),

  tagName: '',

  actions: {
    async markRead(event) {
      event.preventDefault();
      let link = this.get('link');
      link.set('read', true);
      await link.save();
    },

    async markUnread(event) {
      event.preventDefault();
      let link = this.get('link');
      link.set('read', false);
      await link.save();
    },

    async delete(event) {
      event.preventDefault();
      let link = this.get('link');
      await link.destroyRecord();
    },
  },
});
