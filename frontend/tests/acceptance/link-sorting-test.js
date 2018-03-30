import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';

describe('link sorting', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('allows adding links', async function() {
    await authenticateSession({ access_token: 'ABC123' });
    await visit('/');

    // added links go to top
    await click('[data-test-add-link]');
    await fillIn('[data-test-url]', 'https://www.first.com');
    await click('[data-test-save-button]');

    await click('[data-test-add-link]');
    await fillIn('[data-test-url]', 'https://www.second.com');
    await click('[data-test-save-button]');

    let linkText = find('[data-test-links]').textContent;

    expect(linkText).to.match(/second[\s\S]+first/);
  });
});
