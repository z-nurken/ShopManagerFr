module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // // we only want single quotes
    // 'quotes': ['error', 'single'],
    // // we want to force semicolons
    // 'semi': ['error', 'always'],
    // // we use 2 spaces to indent our code
    // 'indent': ['error', 2],
    // // we want to avoid useless spaces
    // 'no-multi-spaces': ['error'],
  },
};
