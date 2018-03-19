import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Link ${i}`;
  },

  url(i) {
    return `https://example.com/my-awesome-post-${i}`;
  }
});
