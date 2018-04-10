import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import sinon from 'sinon';

describe('{{link-form}}', function() {
  setupRenderingTest();

  describe('when save is clicked', () => {
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

      await click('[data-test-save-button]');
    });

    it('saves the model', async function() {
      expect(link.save.called).to.be.true;
    });

    it('calls the onSave action', async function() {
      expect(saveHandler.called).to.be.true;
    });
  });

  it('calls the onCancel action when cancel is clicked', async function() {
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
