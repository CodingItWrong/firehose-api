import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import sinon from 'sinon';

describe('{{link-form}}', function() {
  setupRenderingTest();

  describe('when save is clicked', async function() {
    let title = 'Updated Title';
    let link;
    let saveHandler;

    beforeEach(async function() {
      link = EmberObject.create({
        title: 'My Title',
        url: 'https://www.example.com/page',
        save: sinon.spy(),
      });
      saveHandler = sinon.spy();
      this.set('link', link);
      this.set('saveHandler', saveHandler);

      await render(hbs`{{link-form link=link onSave=saveHandler}}`);

      await fillIn('[data-test-title]', title);
      await click('[data-test-save-button]');
    });

    it('saves the model with updated data', async function() {
      expect(link.get('title')).to.equal(title);
      expect(link.get('save').called).to.be.true;
    });

    it('calls the onSave action', async function() {
      expect(saveHandler.called).to.be.true;
    });
  });

  it('calls the handleCancel action when cancel is clicked', async function() {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    let cancelHandler = sinon.spy();
    this.set('link', link);
    this.set('cancelHandler', cancelHandler);

    await render(hbs`{{link-form link=link onCancel=cancelHandler}}`);

    await click('[data-test-cancel-button]');

    expect(cancelHandler.called).to.be.true;
  });
});
