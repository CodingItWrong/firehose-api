import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  bookmarks: DS.hasMany('bookmark'),
});
