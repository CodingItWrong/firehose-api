module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'airbnb-base',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    "array-callback-return": "off",
    "func-names": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "no-restricted-syntax": "off",
    "no-underscore-dangle": "off",
    "prefer-arrow-callback": "off",
    "prefer-const": "off",
    "space-before-function-paren": "off",
    "spaced-comment": "off",
  },
  overrides: [
    // node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
