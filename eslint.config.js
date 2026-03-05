import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import importXPlugin from 'eslint-plugin-import-x';

export default [
  // 1. Base JavaScript ignores
  {
    ignores: ['dist', 'eslint.config.js', 'tailwind.config.ts'],
  },
  // 2. Base JavaScript recommended rules
  js.configs.recommended,
  // 3. TypeScript recommended rules
  ...tsEslint.configs.recommended,
  // 4. Node.js config files (commitlint, etc.)
  {
    files: ['*.cjs'],
    languageOptions: {
      globals: {
        node: true,
        module: true,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  // 5. Project-specific overrides
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        browser: true,
        es2020: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'react-hooks': hooksPlugin,
      'react-refresh': refreshPlugin,
      'import-x': importXPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      // import-x custom rules - simplified without resolver-dependent rules
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: false,
        },
      ],
    },
  },
];
