import DS from 'ember-data'
import { inject as service } from '@ember/service'
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'
import ENV from '../config/environment'

let options = {
  session: service('session'),

  namespace: 'api',

  authorize(xhr) {
    let { access_token } = this.get('session.data.authenticated')
    xhr.setRequestHeader('Authorization', `Bearer ${access_token}`)
  },

  sortQueryParams(query) {
    const { filter, include, page } = query
    return {
      include,
      'filter[read]': filter.read,
      'page[number]': page,
    }
  },
}

if (ENV.apiHost) {
  options.host = ENV.apiHost
}

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, options)
