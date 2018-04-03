import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
    if (payloadKey === 'my-links') {
      return 'link';
    }

    return this._super(payloadKey);
  },

  payloadKeyFromModelName(modelName) {
    if (modelName === 'link') {
      return 'my-links';
    }

    return this._super(modelName);
  },

  keyForRelationship(key, relationship) {
    if (key === 'links') {
      return 'my-links';
    }

    return this._super(key, relationship);
  },
});
