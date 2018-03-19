import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | viewing public links', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it displays public links', async function(assert) {
    let linkModels = server.createList('link', 3);

    await visit('/');

    let linkText = this.element.querySelector('[data-test="links"]').textContent;

    for (let link of linkModels) {
      assert.ok(
        linkText.includes(link.title),
        `Link title ${link.title} not found on page`,
      )
    }
  });
});
