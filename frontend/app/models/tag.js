import Model, { attr, hasMany } from '@ember-data/model';

export default class Tag extends Model {
  @attr name;
  @hasMany('bookmark') bookmarks;
}
