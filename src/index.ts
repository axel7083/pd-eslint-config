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

import js from '@eslint/js';
import type { Config } from 'eslint/config';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint configuration for Podman Desktop repositories.
 *
 * It needs no options: TypeScript projects are discovered through `projectService`
 * (nearest tsconfig.json of each file).
 */
const config: Config[] = defineConfig([
  globalIgnores(['**/dist/**', '**/coverage/**', '**/*.config.{js,mjs,cjs}']),

  js.configs.recommended,
  tseslint.configs.recommended,

  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        projectService: {
          // ambient declarations (e.g. types/podman-desktop-api.d.ts) are usually not part of any tsconfig.json
          allowDefaultProject: ['types/*.d.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: false }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreConditionalTests: true }],
      '@typescript-eslint/no-require-imports': 'off',

      // recommended since eslint v10, not enforced yet
      'preserve-caught-error': 'off',
    },
  },
]);

export default config;
