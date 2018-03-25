import { formatSource } from 'firehose/helpers/format-source';
import { module, test } from 'qunit';

module('Unit | Helper | format-source', () => {
  test('it formats URLs as a link', async function(assert) {
    let sourceURL = 'https://example.com/page'
    let result = formatSource([sourceURL]);
    assert.equal(result, `<a href="${sourceURL}">example.com</a>`);
  });

  test('it returns non-URLs as-is', async function(assert) {
    const nonURLSource = 'a friend';
    assert.equal(formatSource([nonURLSource]), nonURLSource);
  });
});
