import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title: i => `Link ${i}`,
  url: i => `https://example.com/my-awesome-post-${i}`,
  read: false,
});
