module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-console': ['warn', { allow: ['warn'] }],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': [2, 'never'],
    'comma-spacing': ['error', { 'after': true }],
    'semi-spacing': ['error', { 'after': true }],
    'key-spacing': ['error', { 'afterColon': true }],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-trailing-spaces': ['warn', { 'skipBlankLines': true }],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'vue/html-indent': ['warn', 2],
    'eol-last': ['error', 'always'],
  },
}
