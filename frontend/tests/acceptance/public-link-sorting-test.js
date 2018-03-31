import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

describe('public link sorting', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('sorts public lists in the order published', async function() {
    await authenticateSession({ access_token: 'ABC123' });
    await visit('/');

    // added links go to top
    await click('[data-test-add-link]');
    await fillIn('[data-test-url]', 'https://www.first.com');
    await click('[data-test-save-button]');

    await click('[data-test-add-link]');
    await fillIn('[data-test-url]', 'https://www.second.com');
    await click('[data-test-save-button]');

    await click('[data-test-button-edit]');
    await click('[data-test-public]');
    await click('[data-test-save-button]');

    let editButtons = findAll('[data-test-button-edit]');
    await click(editButtons[1]);
    await click('[data-test-public]');
    await click('[data-test-save-button]');

    await invalidateSession();

    let linkText = find('[data-test-links]').textContent;
    expect(linkText).to.match(/first[\s\S]+second/);
  });
});
