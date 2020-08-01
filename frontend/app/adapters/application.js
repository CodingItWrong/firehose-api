import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
// eslint-disable-next-line ember/no-mixins
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

let options = {
  session: service('session'),

  namespace: 'api',

  headers: computed(
    'session.{isAuthenticated,data.authenticated.access_token}',
    function () {
      const headers = {};
      if (this.session.isAuthenticated) {
        headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`;
      }
      return headers;
    },
  ),
};

if (ENV.apiHost) {
  options.host = ENV.apiHost;
}

export default JSONAPIAdapter.extend(DataAdapterMixin, options);
