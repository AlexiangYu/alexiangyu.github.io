// @ts-check

import eslint from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import { configs as tsEslintConfigs } from '@typescript-eslint/eslint-plugin'

const tsEslintRecommended = [
  {
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended']
  }
];

export default [
  eslint.configs.recommended,
  ...tsEslintRecommended,
  ...eslintPluginAstro.configs.recommended,
  // Ignore files
  {
    ignores: ['public/scripts/*', 'scripts/*', '.astro/', 'src/env.d.ts']
  }
]
