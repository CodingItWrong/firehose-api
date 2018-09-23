import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import EmberObject from '@ember/object';

describe('{{link-row}}', () => {
  setupRenderingTest();

  it('shows if the read status matches showIfRead', async function () {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: false,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link showIfRead=false}}`);

    expect(find('[data-test-link-title]')).to.exist;
  });

  it('hides if the read status does not match showIfRead', async function () {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: true,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link showIfRead=false}}`);

    expect(find('[data-test-link-title]')).to.not.exist;
  });

  it('shows itself if showIfRead is not set', async function () {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: false,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link}}`);

    expect(find('[data-test-link-title]')).to.exist;
  });

  it('renders the form when edit is clicked', async function () {
    let session = Service.extend({ isAuthenticated: () => false });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link}}`);

    await click('[data-test-button-edit]');

    expect(find('[data-test-title]')).to.exist;
  });

  it('renders the detail when cancel is clicked', async function () {
    let session = Service.extend({ isAuthenticated: () => false });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link}}`);

    await click('[data-test-button-edit]');
    await click('[data-test-cancel-button]');

    expect(find('[data-test-link-title]')).to.exist;
  });

  it('renders the detail when save is clicked', async function () {
    let session = Service.extend({ isAuthenticated: () => false });
    this.owner.register('service:session', session);

    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      save: () => {},
      tags: { reload: () => {} },
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link}}`);

    await click('[data-test-button-edit]');
    await click('[data-test-save-button]');

    expect(find('[data-test-link-title]')).to.exist;
  });
});
