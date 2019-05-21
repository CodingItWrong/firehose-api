import DS from 'ember-data'
const { Model } = DS
import { attr } from '@ember-decorators/data'

const { hasMany } = DS

export default class Tag extends Model {
  @attr name
  @hasMany('bookmark') bookmarks
}
