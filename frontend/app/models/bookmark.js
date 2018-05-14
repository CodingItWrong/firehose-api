import {
  Model,
  attr,
  hasMany,
} from 'ember-orbit';

export default Model.extend({
  title: attr('string'),
  url: attr('string'),
  comment: attr('string'),
  source: attr('string'),
  tag_list: attr('string'),
  read: attr('string'),
  public: attr('string'),
  moved_to_list_at: attr('date'),
  published_at: attr('date'),

  tags: hasMany('tag', { inverse: 'bookmarks' }),
});
