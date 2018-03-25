import { formatSource } from 'firehose/helpers/format-source';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('formatSource()', () => {
  it('formats URLs as a link', () => {
    let sourceURL = 'https://example.com/page';
    let result = formatSource(sourceURL);
    expect(result).to.eq(`<a href="${sourceURL}">example.com</a>`);
  });

  it('returns non-URLs as-is', () => {
    const nonURLSource = 'a friend';
    expect(formatSource(nonURLSource)).to.eq(nonURLSource);
  });
});
