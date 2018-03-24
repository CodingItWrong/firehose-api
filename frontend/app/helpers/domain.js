import { helper } from '@ember/component/helper';

export function domain([domain]/*, hash*/) {
  let host = new URL(domain).hostname;

  if (host.startsWith('www.')) {
    host = host.substr(4);
  }

  return host;
}

export default helper(domain);
