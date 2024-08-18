import defineConfig from '@antfu/eslint-config'

export default defineConfig({
  unocss: true,
  stylistic: {
    indent: 2, // 缩进 default 2
    semi: false, // 结尾分号 default false
    jsx: true, // jsx 语法 default true
    quotes: 'single', // 单引号 default single
  },

  rules: {
    'vue/valid-attribute-name': 0,
    'no-console': 0,
    'style/no-tabs': 0,
    'ts/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'curly': 0,
    'arrow-parens': 0,
    'antfu/top-level-function': 0,
    'no-restricted-syntax': 0,
    'vue/no-unused-refs': 1,
    'unused-imports/no-unused-vars': 1,
    'node/prefer-global/process': 0,
    'ts/no-unused-expressions': 0,
    'prefer-promise-reject-errors': 0,
    'ts/no-use-before-define': 1,
    'array-callback-return': 1,
    'ts/no-unsafe-function-type': 1,
    'vue/component-name-in-template-casing': 0,
    'regexp/no-unused-capturing-group': 0,
    'ts/no-namespace': 0,
  },
})
