import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async handleSave() {
      let link = this.get('model');
      await link.save();
      this.transitionToRoute('index');
    },
  },
});
