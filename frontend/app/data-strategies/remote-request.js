import { RequestStrategy } from '@orbit/coordinator';

export default {
  create() {
    return new RequestStrategy({
      name: 'remote-request',

      source: 'store',
      on: 'beforeQuery',

      target: 'remote',
      action: 'pull',

      blocking: true,
    });
  },
};
