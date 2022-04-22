module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': 'off',
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-await-in-a-loop': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-props-no-spreading': ['off', {
      html: 'ignore',
      custom: 'ignore',
    }],
  },
};
