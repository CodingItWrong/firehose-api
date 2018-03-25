import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

let options = {
  namespace: 'api',
  authorizer: 'authorizer:oauth2',
};

if (ENV.apiHost) {
  options.host = ENV.apiHost;
}

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, options);
