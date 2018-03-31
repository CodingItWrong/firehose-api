import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    moved_to_list_at: { serialize: false },
    published_at: { serialize: false },
  },
});
