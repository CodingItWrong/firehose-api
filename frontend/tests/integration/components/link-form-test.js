import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import { setupRenderingTest } from 'ember-mocha'
import { render, fillIn, click } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import EmberObject from '@ember/object'
import sinon from 'sinon'

describe('{{link-form}}', function() {
  setupRenderingTest()

  describe('when save is clicked', () => {
    let link
    let saveHandler
    let updatedTitle = 'Updated Title'

    beforeEach(async function() {
      link = EmberObject.create({
        title: 'My Title',
        url: 'https://www.example.com/page',
        save: sinon.spy(),
        tags: { reload: () => {} },
      })
      saveHandler = sinon.spy()
      this.set('link', link)
      this.set('saveHandler', saveHandler)

      await render(hbs`{{link-form link=link onSave=saveHandler}}`)

      await fillIn('[data-test-title] input', updatedTitle)
      await click('[data-test-save-button]')
    })

    it('updates fields on the model', async function() {
      expect(link.get('title')).to.equal(updatedTitle)
    })

    it('saves the model', async function() {
      expect(link.save).to.have.been.called
    })

    it('calls the onSave action', async function() {
      expect(saveHandler).to.have.been.called
    })
  })

  it('calls the onCancel action when cancel is clicked', async function() {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    })
    let cancelHandler = sinon.spy()
    this.set('link', link)
    this.set('cancelHandler', cancelHandler)

    await render(hbs`{{link-form link=link onCancel=cancelHandler}}`)

    await click('[data-test-cancel-button]')

    expect(cancelHandler).to.have.been.called
  })
})
