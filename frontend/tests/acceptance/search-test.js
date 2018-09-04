import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, find, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('search', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  it('allows searching public links', async function() {
    let linkToShow = server.create('bookmark', {
      title: 'Awesome Link',
      read: true,
    });
    let linkToHide = server.create('bookmark', {
      title: 'Lame Link',
      read: true,
    });

    await visit('/links/read');
    await fillIn('[data-test-search-input]', 'awesome');

    let link = find('[data-test-links]');
    expect(link).to.contain.text(linkToShow.title);
    expect(link).not.to.contain.text(linkToHide.title);
  });
});
