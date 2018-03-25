import { module, test } from 'qunit';
import { visit, fillIn, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | auth', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('sign in and sign out', async function(assert) {
    await visit('/');

    await click('[data-test-login-link]');

    await fillIn('[data-test-email-field]', 'example@example.com');
    await fillIn('[data-test-password-field]', 'password');
    await click('[data-test-login-button]');

    assert.ok(find('[data-test-logout-button]'), 'Sign Out button not found');

    await click('[data-test-logout-button]');

    assert.ok(
      find('[data-test-logout-button]') === null,
      'Sign Out button was not expected, but was found'
    );

    await click('[data-test-login-link]');

    assert.equal(
      find('[data-test-email-field]').value,
      '',
      'Expected email field to start out cleared'
    );
  });
});
