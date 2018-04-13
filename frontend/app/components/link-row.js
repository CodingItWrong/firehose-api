import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  session: service(),

  tagName: '',

  editing: false,

  showLink: computed('link.read', function() {
    if (typeof this.showIfRead === 'undefined') {
      return true;
    }
    return this.showIfRead === this.link.read;
  }),

  actions: {
    edit() {
      this.set('editing', true);
    },

    finishEditing() {
      this.set('editing', false);
    },
  },
});
