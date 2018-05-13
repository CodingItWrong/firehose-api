import { SyncStrategy } from '@orbit/coordinator';

export default {
  create() {
    return new SyncStrategy({
      name: 'remote-sync',

      source: 'remote',
      target: 'store',

      blocking: false,
    });
  },
};
