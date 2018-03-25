import { domain } from 'firehose/helpers/domain';
import { module, test } from 'qunit';

module('Unit | Helper | domain', () => {
  test('it retrieves just the domain', async function(assert) {
    let result = domain(['https://example.com/my-blog-post']);
    assert.equal(result, 'example.com');
  });

  test('it removes www', async function(assert) {
    let result = domain(['https://www.example.com/my-blog-post']);
    assert.equal(result, 'example.com');
  });

  test('it does not remove subdomains other than www', async function(assert) {
    let result = domain(['https://subdomain.example.com/my-blog-post']);
    assert.equal(result, 'subdomain.example.com');
  });
});
