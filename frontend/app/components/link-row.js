import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),

  tagName: 'li',
  classNames: ['list-group-item', 'clearfix', 'h-entry'],
});
