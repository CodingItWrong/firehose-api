import { helper } from '@ember/component/helper';

export function domain(url) {
  let host = new URL(url).hostname;

  if (host.startsWith('www.')) {
    host = host.substr(4);
  }

  return host;
}

function domainForEmber([url]/*, hash*/) {
  return domain(url);
}

export default helper(domainForEmber);
