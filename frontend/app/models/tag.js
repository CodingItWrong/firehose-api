import {
  Model,
  attr,
  hasMany,
} from 'ember-orbit';

export default Model.extend({
  name: attr('string'),
  bookmarks: hasMany('bookmark', { inverse: 'tags' }),
});
