//https://blog.csdn.net/Sheng_zhenzhen/article/details/108685176
//
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    window: true,
    defineProps: true,
    defineExpose: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-unused-vars': 'off',
    'linebreak-style': ['error', 'unix'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-useless-escape': 'off',
    'no-bitwise': 'off',
    'vue/no-setup-props-destructure': 'off',
    'no-param-reassign': 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
