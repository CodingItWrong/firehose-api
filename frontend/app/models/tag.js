import DS from 'ember-data'
const { Model } = DS

const { attr, hasMany } = DS

export default class Tag extends Model {
  @attr() name
  @hasMany('bookmark') bookmarks
}
