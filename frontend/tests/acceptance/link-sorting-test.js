import { describe, it } from 'mocha'
import { expect } from 'chai'
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-mocha'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'
import { authenticateSession } from 'ember-simple-auth/test-support'

describe('link sorting', function() {
  let hooks = setupApplicationTest()
  setupMirage(hooks)

  it('sorts lists in the order added to that list', async function() {
    await authenticateSession({ access_token: 'ABC123' })
    await visit('/')

    // added links go to top
    await fillIn('[data-test-url]', 'https://www.first.com')
    await click('[data-test-add-button]')

    await fillIn('[data-test-url]', 'https://www.second.com')
    await click('[data-test-add-button]')

    await fillIn('[data-test-url]', 'https://www.third.com')
    await click('[data-test-add-button]')

    let linkText = find('[data-test-links]').textContent
    expect(linkText).to.match(/third[\s\S]+second[\s\S]+first/)

    // links mark read go in the order of most recently marked read
    let markReadButtons = findAll('[data-test-button-mark-read]')
    await click(markReadButtons[0])
    await click(markReadButtons[2])
    await click(markReadButtons[1])

    await click('[data-test-read-link]')

    linkText = find('[data-test-links]').textContent
    expect(linkText).to.match(/second[\s\S]+first[\s\S]+third/)

    // links marked unread again go in the order of most recently marked unread
    let markUnreadButtons = findAll('[data-test-button-mark-unread]')
    await click(markUnreadButtons[2])
    await click(markUnreadButtons[0])
    await click(markUnreadButtons[1])

    await click('[data-test-unread-link]')

    linkText = find('[data-test-links]').textContent
    expect(linkText).to.match(/first[\s\S]+second[\s\S]+third/)
  })
})
