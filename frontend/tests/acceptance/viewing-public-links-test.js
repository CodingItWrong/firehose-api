import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('viewing public links', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('displays public links', async function() {
    let linkModels = server.createList('link', 3);

    await visit('/');

    let linkText = find('[data-test-links]').textContent;

    for (let link of linkModels) {
      expect(linkText).to.include(link.title);
    }
  });
});
