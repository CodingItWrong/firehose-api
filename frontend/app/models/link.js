import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  comment: DS.attr('string'),
  source: DS.attr('string'),
  read: DS.attr('boolean'),
  moved_to_list_at: DS.attr('date'),
});
