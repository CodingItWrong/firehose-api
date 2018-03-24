import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import { domain } from 'firehose/helpers/domain';

export function formatSource([source]/*, hash*/) {
  let sourceURL;
  try {
    sourceURL = new URL(source);
  } catch(e) {
    return source;
  }

  let sourceDomain = domain([sourceURL]);
  let rawHtml = `<a href="${sourceURL}">${sourceDomain}</a>`;
  return htmlSafe(rawHtml);
}

export default helper(formatSource);
