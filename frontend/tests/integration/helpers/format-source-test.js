import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-source', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats URLs as a link', async function(assert) {
    const sourceURL = 'https://example.com/page';
    this.set('source', sourceURL);

    await render(hbs`{{format-source source}}`);

    assert.equal(
      this.element.innerHTML,
      `<a href="${sourceURL}">example.com</a>`
    );
  });

  test('it returns non-URLs as-is', async function(assert) {
    const nonURLSource = 'a friend';
    this.set('source', nonURLSource);

    await render(hbs`{{format-source source}}`);

    assert.equal(this.element.innerHTML, 'a friend');
  });
});
