import DS from 'ember-data'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'
import ENV from '../config/environment'

let options = {
  session: service('session'),

  namespace: 'api',

  headers: computed('session.data.authenticated.access_token', function () {
    const headers = {}
    if (this.session.isAuthenticated) {
      headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`
    }
    return headers
  }),
}

if (ENV.apiHost) {
  options.host = ENV.apiHost
}

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, options)
