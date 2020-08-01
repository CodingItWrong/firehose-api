import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class BookmarkSerializer extends JSONAPISerializer {
  attrs = {
    moved_to_list_at: { serialize: false },
    published_at: { serialize: false },
  };
}
