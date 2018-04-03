import Controller from '@ember/controller';
import { computed } from '@ember/object';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Controller.extend({
  buffer: computed('model', function() {
    return BufferedProxy.create({
      content: this.get('model'),
    });
  }),

  actions: {
    async handleSave(event) {
      event.preventDefault();
      this.get('buffer').applyBufferedChanges();
      let link = this.get('model');
      await link.save();
      this.transitionToRoute('index');
    },
  },
});
