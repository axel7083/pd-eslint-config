/**********************************************************************
 * Copyright (C) 2026 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/
import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import type { Config } from 'eslint/config';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import svelte from 'eslint-plugin-svelte';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint configuration for Podman Desktop repositories.
 *
 * It needs no options:
 * - TypeScript projects are discovered through `projectService` (nearest tsconfig.json of each file)
 * - Svelte components run in the browser and get browser globals
 * - svelte-eslint-parser resolves the closest `svelte.config.js` of each linted file
 */
const config: Config[] = defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    '**/__mocks__/**',
    '**/test-resources/**',
    '**/.svelte-kit/**',
    '**/src-generated/**',
    '**/*.config.{js,mjs,cjs}',
    '**/*.tests.setup.{js,mjs,ts}',
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  // eslint-plugin-import does not declare ESLint 10 support yet
  fixupConfigRules([importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript]),

  {
    plugins: {
      unicorn,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        warnOnUnsupportedTypeScriptVersion: false,
        projectService: {
          // ambient declarations (e.g. types/podman-desktop-api.d.ts) are usually not part of any tsconfig.json
          allowDefaultProject: ['types/*.d.ts'],
        },
      },
    },
    rules: {
      eqeqeq: 'error',
      'prefer-promise-reject-errors': 'error',
      semi: ['error', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],

      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: false }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreConditionalTests: true }],
      '@typescript-eslint/no-require-imports': 'off',

      // import/namespace is not fully compatible with the compat mode
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-extraneous-dependencies': 'error',

      'unicorn/prefer-node-protocol': 'error',

      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-empty-collection': 'off',
      'sonarjs/no-small-switch': 'off',
      // redundant with @typescript-eslint/no-unused-vars
      'sonarjs/no-ignored-exceptions': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/sonar-max-params': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/no-empty-function': 'off',
      'sonarjs/no-base-to-string': 'off',
      'sonarjs/unnecessary-character-escapes': 'off',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/new-cap': 'off',
      'sonarjs/no-invariant-returns': 'off',
      'sonarjs/updated-loop-counter': 'off',
      'sonarjs/no-redundant-type-constituents': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/no-lonely-if': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/use-type-alias': 'off',
      // already enabled by eslint
      'sonarjs/no-async-constructor': 'off',
      // already enabled by typescript
      'sonarjs/no-misused-promises': 'off',
      'sonarjs/no-redeclare': 'off',
      'sonarjs/no-dead-store': 'off',
      // consuming too much time
      'sonarjs/aws-restricted-ip-admin-access': 'off',
      'sonarjs/arguments-order': 'off',
      'sonarjs/no-redundant-assignments': 'off',
      // failing with the AST parser
      'sonarjs/sonar-no-fallthrough': 'off',
      'sonarjs/prefer-enum-initializers': 'off',
      'sonarjs/no-unused-expressions': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/no-skipped-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'sonarjs/super-linear-regex': 'off',
      'sonarjs/no-trivial-assertions': 'off',

      // recommended since eslint v10, not enforced yet
      'preserve-caught-error': 'off',
    },
  },

  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    extends: [svelte.configs['flat/recommended']],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'sonarjs/no-nested-assignment': 'off',
      'sonarjs/no-alphabetical-sort': 'off',
    },
  },

  {
    files: ['**/*.spec.ts'],
    rules: {
      'sonarjs/no-hardcoded-ip': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/publicly-writable-directories': 'off',
    },
  },
]);

export default config;
