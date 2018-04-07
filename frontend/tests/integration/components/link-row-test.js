import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

describe('{{link-row}}', () => {
  setupRenderingTest();

  it('shows itself if the model read status matches showIfRead', async function() {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: false,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link showIfRead=false}}`);

    expect(find('[data-test-link-title]')).to.exist;
  });

  it('hides itself if the model read status does not match showIfRead', async function() {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: true,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link showIfRead=false}}`);

    expect(find('[data-test-link-title]')).to.not.exist;
  });

  it('shows itself if showIfRead is not set', async function() {
    let link = EmberObject.create({
      title: 'My Title',
      url: 'https://www.example.com/page',
      read: false,
    });
    this.set('link', link);

    await render(hbs`{{link-row link=link}}`);

    expect(find('[data-test-link-title]')).to.exist;
  });
});
