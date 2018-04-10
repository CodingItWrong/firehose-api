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

    // add
    await fillIn('[data-test-url]', 'https://www.example.com');
    await click('[data-test-add-button]');

    let linkText = find('[data-test-links]').textContent;

    expect(linkText).to.include('My Link Title');

    // mark read
    await click('[data-test-button-mark-read]');
    linkText = find('[data-test-links]').textContent;
    expect(linkText).not.to.include('My Link Title');

    await click('[data-test-read-link]');
    linkText = find('[data-test-links]').textContent;
    expect(linkText).to.include('My Link Title');

    // mark unread
    await click('[data-test-button-mark-unread]');

    await click('[data-test-unread-link]');
    linkText = find('[data-test-links]').textContent;
    expect(linkText).to.include('My Link Title');

    // edit
    const title = 'Updated Title';

    await click('[data-test-button-edit-inline]');
    await fillIn('[data-test-title]', title);
    await fillIn('[data-test-tags]', 'foo bar');
    await click('[data-test-save-button]');

    linkText = find('[data-test-links]').textContent;
    expect(linkText).to.include(title);

    // cancelling edit
    await click('[data-test-button-edit-inline]');
    await fillIn('[data-test-title]', 'Title Update to Cancel');
    await click('[data-test-cancel-button]');

    linkText = find('[data-test-links]').textContent;
    expect(linkText).to.include(title);

    // delete
    await click('[data-test-button-delete]');
    linkText = find('[data-test-links]').textContent;
    expect(linkText).not.to.include(title);
  });
});
