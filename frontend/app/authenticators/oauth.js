import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

const serverTokenPath = '/api/oauth/token';
const serverTokenEndpoint = ENV.apiHost
  ? ENV.apiHost + serverTokenPath
  : serverTokenPath;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint,
});
