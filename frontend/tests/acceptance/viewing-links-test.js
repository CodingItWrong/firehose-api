import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';

describe('viewing public links', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('displays read and unread links', async function() {
    let unreadLink = server.create('link', { title: 'My Unread Link', read: false });
    let readLink = server.create('link', { title: 'My Read Link', read: true });

    await authenticateSession({ access_token: 'ABC123' });
    await visit('/');

    let linkText = find('[data-test-links]').textContent;

    expect(linkText).to.include(unreadLink.title);
    expect(linkText).not.to.include(readLink.title);
  });
});
