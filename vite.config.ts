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
import { resolve } from 'node:path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { builtinModules } from 'node:module';
import {readFile} from "node:fs/promises";

export default defineConfig(async () => {
  const nodeVersion = await readFile(resolve(import.meta.dirname, '.nvmrc'), 'utf-8');
  return {
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],
    },
    build: {
      target: `node${nodeVersion.trim()}`,
      lib: {
        entry: {
          base: resolve(import.meta.dirname, 'src/base.ts'),
          svelte: resolve(import.meta.dirname, 'src/svelte.ts'),
        },
        formats: ['es']
      },
      rolldownOptions: {
        platform: 'node',
        external: [
          ...builtinModules.flatMap(p => [p, `node:${p}`]),
          'eslint',
          'eslint/config',
          '@eslint/js',
          'typescript-eslint',
          '@typescript-eslint/parser',
          '@typescript-eslint/eslint-plugin',
          'eslint-plugin-svelte',
          'svelte-eslint-parser',
        ],
      },
    },
    plugins: [
      dts(),
    ],
  } satisfies UserConfig
});
