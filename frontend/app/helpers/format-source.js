import { helper } from '@ember/component/helper'
import { htmlSafe } from '@ember/string'
import { domain } from 'firehose/helpers/domain'

export function formatSource(source) {
  let sourceURL
  try {
    sourceURL = new URL(source)
  } catch (e) {
    return source
  }

  let sourceDomain = domain([sourceURL])
  return `<a href="${sourceURL}">${sourceDomain}</a>`
}

function formatSourceForEmber([source] /*, hash*/) {
  return htmlSafe(formatSource(source))
}

export default helper(formatSourceForEmber)
