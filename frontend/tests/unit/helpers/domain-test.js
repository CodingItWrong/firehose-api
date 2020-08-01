import { domain } from 'firehose/helpers/domain';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('domain()', () => {
  it('retrieves just the domain', () => {
    let result = domain('https://example.com/my-blog-post');
    expect(result).to.eq('example.com');
  });

  it('removes www', () => {
    let result = domain('https://www.example.com/my-blog-post');
    expect(result).to.eq('example.com');
  });

  it('does not remove subdomains other than www', () => {
    let result = domain('https://subdomain.example.com/my-blog-post');
    expect(result).to.eq('subdomain.example.com');
  });
});
