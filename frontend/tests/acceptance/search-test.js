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

    let linkText = find('[data-test-links]').textContent;
    expect(linkText).to.include(linkToShow.title);
    expect(linkText).not.to.include(linkToHide.title);
  });
});
