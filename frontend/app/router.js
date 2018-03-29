import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('login');

  this.route('links', function() {
    this.route('read');
    this.route('new');
    this.route('edit', { path: '/:link_id/edit' });
  });
});

export default Router;
