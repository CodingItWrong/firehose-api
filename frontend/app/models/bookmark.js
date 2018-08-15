import DS from 'ember-data';
const { Model } = DS;
import { attr, hasMany } from '@ember-decorators/data';

export default class Bookmark extends Model {
  @attr title;
  @attr url;
  @attr comment;
  @attr source;
  @attr tag_list;
  @attr read;
  @attr public;
  @attr('date') moved_to_list_at;
  @attr('date') published_at;

  @hasMany('tag') tags;
}
