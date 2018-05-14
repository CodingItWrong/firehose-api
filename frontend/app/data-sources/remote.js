import JSONAPISource from '@orbit/jsonapi';

export default {
  create(injections = {}) {
    return new JSONAPISource({
      ...injections,
      name: 'remote',
      host: 'http://localhost:3000',
      namespace: 'api',
    });
  },
};
