import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  url: DS.attr(),
  comment: DS.attr(),
  source: DS.attr(),
  tag_list: DS.attr(),
  read: DS.attr(),
  public: DS.attr(),
  moved_to_list_at: DS.attr('date'),
  published_at: DS.attr('date'),

  tags: DS.hasMany('tag'),
});
