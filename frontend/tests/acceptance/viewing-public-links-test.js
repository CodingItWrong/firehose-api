import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('viewing public links', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('displays all public links', async function() {
    let unreadLink = server.create('link', { title: 'My Unread Link', read: false });
    let readLink = server.create('link', { title: 'My Read Link', read: true });
    let linkModels = [unreadLink, readLink];

    await visit('/');

    let linkText = find('[data-test-links]').textContent;

    for (let link of linkModels) {
      expect(linkText).to.include(link.title);
    }
  });
});
