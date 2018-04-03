import Controller from '@ember/controller';

export default Controller.extend({
  resetForm() {
    this.set('url', '');
  },

  actions: {
    async handleSave(event) {
      event.preventDefault();
      let link = this.store.createRecord('link', { url: this.get('url') });
      await link.save();
      this.transitionToRoute('index');
    },
  },
});
