import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { visit, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';

describe('viewing tags', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(function() {
    let fooTag = server.create('tag', { name: 'foo' });
    let barTag = server.create('tag', { name: 'bar' });
    server.create('link', {
      title: 'My Public Link',
      public: true,
      tags: [fooTag],
    });
    server.create('link', {
      title: 'My Private Link',
      read: false,
      tags: [barTag],
    });
  });

  describe('authenticated', async function() {
    it('displays all tags', async function() {
      await authenticateSession({ access_token: 'ABC123' });
      await visit('/');

      await click('[data-test-tags-link]');

      let tagText = find('[data-test-tags]').textContent;

      expect(tagText).to.include('foo');
      expect(tagText).to.include('bar');
    });
  });
});
