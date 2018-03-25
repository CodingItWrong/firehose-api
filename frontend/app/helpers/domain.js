import { helper } from '@ember/component/helper';

export function domain([url]/*, hash*/) {
  let host = new URL(url).hostname;

  if (host.startsWith('www.')) {
    host = host.substr(4);
  }

  return host;
}

export default helper(domain);
