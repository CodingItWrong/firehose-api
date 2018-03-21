import DS from 'ember-data';
import ENV from '../config/environment';

let options = {
  namespace: 'api',
};

if (ENV.apiHost) {
  options.host = ENV.apiHost;
}

export default DS.JSONAPIAdapter.extend(options);
