import { module, test } from 'qunit';
import { visit, fillIn, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | auth', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('sign in and sign out', async function(assert) {
    await visit('/');

    await click('.test-login-link');

    await fillIn('.test-email', 'example@example.com');
    await fillIn('.test-password', 'password');
    await click('.test-login-button');

    assert.ok(find('.test-logout-button'), 'Sign Out button not found');

    await click('.test-logout-button');

    assert.ok(
      find('.test-logout-button') === null,
      'Sign Out button was not expected, but was found'
    );
  });
});
