import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | domain', function(hooks) {
  setupRenderingTest(hooks);

  test('it retrieves just the domain', async function(assert) {
    this.set('fullURL', 'https://example.com/my-blog-post');

    await render(hbs`{{domain fullURL}}`);

    assert.equal(this.element.textContent.trim(), 'example.com');
  });

  test('it removes www', async function(assert) {
    this.set('fullURL', 'https://www.example.com/my-blog-post');

    await render(hbs`{{domain fullURL}}`);

    assert.equal(this.element.textContent.trim(), 'example.com');
  });

  test('it does not remove subdomains other than www', async function(assert) {
    this.set('fullURL', 'https://subdomain.example.com/my-blog-post');

    await render(hbs`{{domain fullURL}}`);

    assert.equal(this.element.textContent.trim(), 'subdomain.example.com');
  });
});
