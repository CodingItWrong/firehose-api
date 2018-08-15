import DS from 'ember-data';
const { Model } = DS;
import { attr, hasMany } from '@ember-decorators/data';

export default class Tag extends Model {
  @attr name;
  @hasMany('bookmark') bookmarks;
}
