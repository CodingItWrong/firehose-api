import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';

describe('editing links', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('allows adding links', async function() {
    await authenticateSession({ access_token: 'ABC123' });
    await visit('/');

    await click('[data-test-add-link]');

    await fillIn('[data-test-url]', 'https://www.example.com');
    await click('[data-test-save-button]');

    let linkText = find('[data-test-links]').textContent;

    expect(linkText).to.include('My Link Title');
  });
});
