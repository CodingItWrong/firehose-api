import { describe, it } from 'mocha'
import { expect } from 'chai'
import { visit, find, click } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-mocha'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'
import { authenticateSession } from 'ember-simple-auth/test-support'

describe('viewing links', function () {
  let hooks = setupApplicationTest()
  setupMirage(hooks)

  it('displays read and unread links', async function () {
    let tag = server.create('tag', { name: 'foo' })
    let unreadLink = server.create('bookmark', {
      title: 'My Unread Link',
      read: false,
      tags: [tag],
    })
    let readLink = server.create('bookmark', {
      title: 'My Read Link',
      read: true,
    })

    await authenticateSession({ access_token: 'ABC123' })
    await visit('/')

    let link = find('[data-test-links]')

    expect(link).to.contain.text(unreadLink.title)
    expect(link).not.to.contain.text(readLink.title)

    await click('[data-test-read-link]')

    link = find('[data-test-links]')

    expect(link).to.contain.text(readLink.title)
    expect(link).not.to.contain.text(unreadLink.title)

    await click('[data-test-unread-link]')

    link = find('[data-test-links]')

    expect(link).to.contain.text(unreadLink.title)
    expect(link).to.contain.text('foo')
    expect(link).not.to.contain.text(readLink.title)
  })
})
