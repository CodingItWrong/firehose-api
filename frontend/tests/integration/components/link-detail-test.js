import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, find, click } from '@ember/test-helpers';
import Service from '@ember/service';
import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('{{link-detail}}', function () {
  setupRenderingTest();

  it('does not display action buttons when signed out', async function () {
    let session = Service.extend({ isAuthenticated: () => false });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    this.set('link', link);

    await render(hbs`{{link-detail link=link session=session}}`);

    expect(find('[data-test-button-mark-read]')).not.to.exist;
    expect(find('[data-test-button-edit]')).not.to.exist;
    expect(find('[data-test-button-delete]')).not.to.exist;
  });

  it('it displays action buttons when signed in', async function () {
    let session = Service.extend({ isAuthenticated: () => true });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    this.set('link', link);

    await render(hbs`{{link-detail link=link}}`);

    expect(find('[data-test-button-mark-read]')).to.exist;
    expect(find('[data-test-button-edit]')).to.exist;
    expect(find('[data-test-button-delete]')).to.exist;
  });

  it('it displays Mark Unread when read', async function () {
    let session = Service.extend({ isAuthenticated: () => true });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: true,
    });
    this.set('link', link);

    await render(hbs`{{link-detail link=link}}`);

    expect(find('[data-test-button="mark-unread"]')).to.exist;
    expect(find('[data-test-button-mark-read]')).not.to.exist;
  });

  it('calls the onEdit handler when edit is clicked', async function () {
    let session = Service.extend({ isAuthenticated: () => true });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    let editHandler = sinon.spy();
    this.set('link', link);
    this.set('editHandler', editHandler);

    await render(hbs`{{link-detail link=link onEdit=editHandler}}`);

    await click('[data-test-button-edit]');

    expect(editHandler).to.have.been.called;
  });
});
