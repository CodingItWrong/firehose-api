import { RequestStrategy } from '@orbit/coordinator';

export default {
  create() {
    return new RequestStrategy({
      name: 'remote-update',

      source: 'store',
      on: 'beforeUpdate',

      target: 'remote',
      action: 'push',

      blocking: true,
    });
  },
};
