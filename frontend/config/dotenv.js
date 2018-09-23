'use strict';

module.exports = function () {
  return {
    clientAllowedKeys: [
      'SITE_NAME',
      'AUTHOR_URL',
    ],
    failOnMissingKey: false,
  };
};
