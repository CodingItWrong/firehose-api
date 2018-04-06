import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    moved_to_list_at: { serialize: false },
    published_at: { serialize: false },
  },
});
