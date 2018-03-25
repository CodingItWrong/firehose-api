import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
    if (payloadKey === 'my-links') {
      return 'link';
    }

    return this._super(payloadKey);
  },
});
