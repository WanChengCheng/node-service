/*
 * File: .eslintrc.js
 * File Created: Monday, 5th November 2018 4:15:06 pm
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2018',
  },
  extends: 'airbnb',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*.e2e.js'] },
    ],

    // enable additional rules
  },
  globals: {},
};
