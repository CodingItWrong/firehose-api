'use strict';

module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'plugin:ember/recommended',
    'codingitwrong',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true
  },
  rules: {
    // "array-callback-return": "off",
    "camelcase": "off", // for destructuring underscored values
    "require-await": "off", // for consistency in rendering tests
    // "class-methods-use-this": "off",
    // "func-names": "off",
    // "import/extensions": "off",
    // "import/no-extraneous-dependencies": "off",
    // "import/no-unresolved": "off",
    // "no-else-return": "off",
    // "no-restricted-syntax": "off",
    // "no-underscore-dangle": "off",
    // "no-unused-expressions": "off",
    // "prefer-arrow-callback": "off",
    // "prefer-const": "off",
    // "space-before-function-paren": "off",
    // "spaced-comment": "off",
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'ember-cli-build.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
