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
    server.create('bookmark', {
      title: 'My Foo Link',
      tags: [fooTag],
    });
    server.create('bookmark', {
      title: 'My Bar Link',
      tags: [barTag],
    });
  });

  it('displays all tags returned by the backend', async function() {
    await authenticateSession({ access_token: 'ABC123' });
    await visit('/');

    await click('[data-test-tags-link]');

    let tagText = find('[data-test-tags]').textContent;

    expect(tagText).to.include('foo');
    expect(tagText).to.include('bar');

    await click('[data-test-tag="foo"]');

    let linkText = find('[data-test-links]').textContent;

    expect(linkText).to.include('foo');
    expect(linkText).not.to.include('bar');
  });
});
